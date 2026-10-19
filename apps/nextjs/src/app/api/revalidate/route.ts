import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

type WebhookPayload = { path?: string }

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 })
  }

  const secret = process.env.SANITY_REVALIDATE_SECRET ?? process.env.REVALIDATE_SECRET
  if (!secret) {
    return new NextResponse("Missing environment variable SANITY_REVALIDATE_SECRET", {
      status: 500,
    })
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret)

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature", isValidSignature, body },
        { status: 401 }
      )
    }

    const path = body?.path ?? "/"
    revalidatePath(path)
    return NextResponse.json({ body, message: `Updated route: ${path}` })
  } catch (err) {
    console.error(err)
    return new NextResponse((err as Error).message, { status: 500 })
  }
}
