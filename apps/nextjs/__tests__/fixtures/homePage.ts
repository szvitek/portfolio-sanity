import type { HomePageData } from "@/lib/sanity"

export const mockHomePageData: HomePageData = {
  profile: {
    title: "John Doe",
    subtitle: "Full-Stack Developer",
    bio: [
      {
        _type: "block",
        _key: "a1b2c3d4",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "e5f6g7h8",
            text: "I build things for the web.",
            marks: [],
          },
        ],
      },
    ],
    avatar: {
      _type: "image",
      asset: {
        _ref: "image-abc123-200x200-png",
      },
    },
    email: "john@example.com",
    cv: {
      asset: {
        _ref: "file-cv123-pdf",
      },
    },
    socialLinks: [
      { platform: "github", url: "https://github.com/johndoe" },
      { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
    ],
  },
}
