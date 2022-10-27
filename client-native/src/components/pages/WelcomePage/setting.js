export const carouselItems = [
  {
    image: require("../../../../assets/carousel-images/undraw_Exams.png"),
    text: "Experience new style of journaling today",
  },
  {
    image: require("../../../../assets/carousel-images/undraw_Memory_storage.png"),
    text: "New level journaling just for you",
  },
  {
    image: require("../../../../assets/carousel-images/undraw_mobile_ux.png"),

    text: "The best journaling app ever - NY Times",
  },
  {
    image: require("../../../../assets/carousel-images/undraw_my_files.png"),

    text: "New stage of journaling evolution! - Time Megazine",
  },
  {
    image: require("../../../../assets/carousel-images/undraw_Questions.png"),

    text: "My new favorite app ever - Bill Gates(Citation needed)",
  },
];

export const themeSwitch = (index) => {
  switch (index) {
    case 0:
      return "#D4C8E2";
    case 1:
      return "#DEC8EB";
    case 2:
      return "#CCC2FF";
    case 3:
      return "#84D5FF";
    case 4:
      return "#6DDDD0";
  }
};
