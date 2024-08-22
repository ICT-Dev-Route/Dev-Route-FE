//프로젝트에서 사용되는 색상 정리
const Colors = {
  white: '#ffffff',
  black: '#000000',
  grey_0: '#F3F3F3',
  grey_1: '#E0E0E0',
  grey_2: '#d5d5d5',
  grey_3: '#a6a6a6',
  grey_4: '#3E3E3E',
  grey_5: '#474747',
  grey_6: '#f8f9fa',
  grey_7: '#e0e0e0',
  grey_8: '#555',
  grey_9: '#666',
  grey_10: '#ced4da',
  grey_11: '#495057',
  grey_12: '#ccc',
  grey_13: '#e9ecef',
  grey_14: '#333',
  headerGrey: '#263238',
  yellow: '#F1C21B',
  lightblue: '#007bff',
  blue: '#0043CE',
  red_0: '#F85B64',
  red_1: '#DA1E28',
  purple: '#735BF2',
  green: '#28a745',
  greenDark: '#218838',
  /////

  modalText: '#343a40',
  modalBackground: '#e9ecef',
  modalBorder: '#ced4da',
  modalHoverBackground: '#dee2e6',
};

export const theme = {
  background: Colors.white,
  text: Colors.black,
  errorText: Colors.red_0,
  main: Colors.grey_4,

  //Header
  textColor: Colors.grey_3,
  hoverTextColor: Colors.white,
  headerBackground: Colors.headerGrey,
  headerLogoText: Colors.white,
  headerBtnBackground: Colors.white,
  headerButtonBackground: Colors.green,
  headerButtonBackground2: Colors.grey_6,
  headerButtonHoverBackground: Colors.greenDark,
  headerButtonText: Colors.white,

  //Footer
  footerBoarder: Colors.grey_7,
  footerBackground: Colors.headerGrey,
  footerText: Colors.white,
  footerHover: Colors.lightblue,

  //CompanyListItem
  companyListItemBackground: Colors.grey_6,
  companyListItemSalary: Colors.green,
  companyListItemStar: Colors.yellow,
  companyListItemDetails: Colors.grey_9,

  //CompanySearchModal
  CompanySearchModalBackground: Colors.white,
  CompanySearchModalSalary: Colors.green,
  CompanySearchModalBookmarkBtnBackground: Colors.red_0,
  CompanySearchModalBookmarkBtnText: Colors.white,
  CompanySearchModalStar: Colors.yellow,
  CompanySearchModalEmptyStar: Colors.grey_8,

  //JobCategorySelector
  JobCategorySelectorBackground: Colors.grey_6,
  JobCategorySelectorItemBackground: Colors.white,
  JobCategorySelectorItemBoarder: Colors.grey_10,
  JobCategorySelectorItemText: Colors.grey_11,
  JobCategorySelectorItemHoverBackground: Colors.grey_13,

  // JobSelectionModal
  jobModalText: Colors.modalText,
  jobModalBackground: Colors.modalBackground,
  jobModalBorder: Colors.modalBorder,
  jobModalHoverBackground: Colors.modalHoverBackground,

  //BannerContainer
  BannerContainerBackground: Colors.grey_6,

  //MainpageBanner
  MainpageBannerTitle: Colors.grey_14,
  MainpageBannerDetail: Colors.grey_8,
  MainpageBannerBtn: Colors.green,
  MainpageBannerBtnHover: Colors.greenDark,

  //RoadmapCategorySelector
  RoadmapCategorySelectorBackground: Colors.grey_6,
  RoadmapCategorySelectorItemBackground: Colors.white,
  RoadmapCategorySelectorBoarder: Colors.grey_10,
  RoadmapCategorySelectorText: Colors.grey11,
  RoadmapCategorySelectorHover: Colors.grey_13,

  //TechStackList
  techStackListBorder: Colors.grey_12,
  techStackListBackground: Colors.grey_6,
  techStackItemBorder: Colors.grey_12,

  //CourseSearch
  courseSearchScrapButton: Colors.red_0,
  courseSearchScrapButtonText: Colors.white,

  //ErrorInquiry
  errorInquiryBackground: Colors.white,
  errorInquiryBorder: Colors.grey_12,
  errorInquiryTitle: Colors.black,
  errorInquiryCaution: Colors.grey_11,
  errorInquiryTextBoarder: Colors.blue,
  errorInquiryBtn: Colors.green,
  errorInquiryBtnHover: Colors.greenDark,

  //Favorites
  favoritesTechStackBtnBoarder: Colors.grey_12,
  favoritesTechStackBtnText: Colors.black,
  favoritesTechStackBtnBackground: Colors.grey_7,
  favoritesTechStackBtnBackgroundHover: Colors.grey_12,
  favoritesCompanyCardBackground: Colors.grey_7,
  favoritesDeleteBtnBackground: Colors.red_0,
  favoritesDeleteBtnText: Colors.white,

  //Login
  loginBackground: Colors.white,
  loginLoginFormBoarder: Colors.grey_12,
  loginTitle: Colors.grey_14,
  loginIconLabel: Colors.grey_8,
  loginStyledInputBoarder: Colors.grey_12,
  loginStyledButtonText: Colors.white,
  loginStyledButtonBackground: Colors.green,
  loginStyledButtonBackgroundHover: Colors.greenDark,
  loginStyledButtonBackgroundDisabled: Colors.grey_12,
  loginDivider: Colors.grey_12,

  //Signup
  signupBackground: Colors.white,
  signupFormBoarder: Colors.grey_12,
  signupTitle: Colors.grey_14,
  signupSubtitle: Colors.grey_9,
  signupIconLabel: Colors.grey_8,
  signupStyledInputBoarder: Colors.grey_12,
  signupStyledSelectBoarder: Colors.grey_12,
  signupStyledButtonText: Colors.white,
  signupStyledButtonBackground: Colors.green,
  signupStyledButtonBackgroundHover: Colors.greenDark,
  signupStyledButtonBackgroundDisabled: Colors.grey_12,

  //Roadmap
  roadmapBackground: Colors.white,
  roadmapInfoText: Colors.black,
  roadmaScrapBtnBackground: Colors.red_0,
  roadmaScrapBtnText: Colors.white,
};
