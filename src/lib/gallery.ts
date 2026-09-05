export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/gallery/lobby-guards.jpg",
    alt: "Two IVS Security guards in uniform at a building lobby post",
    caption: "On-site lobby and access coverage",
  },
  {
    src: "/images/gallery/team-uniform.jpg",
    alt: "Four IVS Security guards in matching uniforms standing indoors",
    caption: "Uniformed team ready for deployment",
  },
  {
    src: "/images/gallery/supervisor-and-guards.jpg",
    alt: "Supervisor standing with two IVS Security guards in an office lobby",
    caption: "Supervised posts and professional conduct",
  },
  {
    src: "/images/gallery/parking-salute.jpg",
    alt: "IVS Security guards saluting in a covered parking area",
    caption: "Parking and premises security",
  },
];
