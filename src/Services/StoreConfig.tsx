import { combineReducers, configureStore } from "@reduxjs/toolkit";
import a11ySlice from "./Slices/a11ySlice";
import websiteInformation from "./Slices/WebsiteInformationSlice";
import socialMedia from "./Slices/SocialMediaSlice"
import emailWebsite from "./Slices/EmailWebsiteSlice"
import FAQSlice from "./Slices/FAQSlice"
import usersByModelSlice from "./Slices/UsersByModelSlice"
import coreSlice from "./Slices/CoreSlice"
import areaOfDuty from "./Slices/AreaOfDutySlice"
import typeOfService from "./Slices/TypeOfServiceSlice"
import unit from "./Slices/UnitSlice"
import tagSlice from "./Slices/TagSlice"
import newsSlice from "./Slices/NewsSlice"
import postersSlice from "./Slices/PostersSlice"
import categorySlice from "./Slices/CategorySlice"
import subCategorySlice from "./Slices/SubcategorySlice"
import recordsSlice from "./Slices/RecordsSlice"
import meSlice from "./Slices/meSlice";
import cardsSlice from "./Slices/CardsSlice";
import cardRegisterSlice from "./Slices/CardRegisterSlice";
import bannerSlice from "./Slices/BannerSlice";
import containerSlice from "./Slices/ContainerSlice";
import serviceButtonsSlice from "./Slices/ServiceButtonsSlice";
import quickAccessButtonsSlice from "./Slices/QuickAccessButtonsSlice";
import CoresAndUnitsSlice from './Slices/CoresAndUnitsSlice';

const reducer = combineReducers({
  a11ySlice,
  websiteInformation,
  socialMedia,
  emailWebsite,
  FAQSlice,
  usersByModelSlice,
  coreSlice,
  areaOfDuty,
  typeOfService,
  unit,
  tagSlice,
  newsSlice,
  postersSlice,
  categorySlice,
  subCategorySlice,
  recordsSlice,
  cardsSlice,
  meSlice,
  cardRegisterSlice,
  bannerSlice,
  containerSlice,
  serviceButtonsSlice,
  quickAccessButtonsSlice,
  CoresAndUnitsSlice,
});

export const store = configureStore({ reducer });
