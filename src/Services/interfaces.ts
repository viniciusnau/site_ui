import { Dayjs } from "dayjs";

interface WebsiteInformation {
  id?: number;
  title?: string;
  description?: string;
  keywords?: string;
  status?: string;
}

interface SocialMedia {
  id: number;
  platform: string;
  url: string;
  status?: string;
}

interface EmailWebsite {
  id: number;
  location: string;
  email: string;
  author?: string;
  status?: string;
}

interface ApiError {
  message: string;
  statusCode?: number;
}

interface FAQ {
  id?: number;
  question?: string;
  answer?: string;
  author?: string;
  status?: string;
}

interface User {
  id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface Core {
  id?: number;
  core_name: string;
  status?: string;
  author?: string;
}

interface AreaOfDuty {
  id?: number;
  dutie_name: string;
  status?: string;
  author?: string;
}

interface TypeOfService {
  id?: number;
  service_name: string;
  status?: string;
  author?: string;
}

interface ServiceItem {
  type_of_service: number;
  schedules: string;
}

interface PhoneItem{
  phone: string;
  is_whatsapp: boolean;
  department: string;
}

interface EmailItem{
  email: string;
}

interface Unit {
  id?: number;
  status: string;
  unit_name: string;
  core: string | number;
  url: string;
  observation: string;
  description: string;
  name_dp: string;
  email_dp: string;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
  contacts: PhoneItem[];
  email: EmailItem[];
  services: ServiceItem[];
  area_of_duty: number[];
  link_schedule_service: string;
  is_principal: boolean;
}

interface Tag{
  name_tag: string;
  times_used: number;
  id: number;
  status: string;
  author: string;
}

interface NewsForm {
  status: string;
  title: string;
  subtitle: string;
  slug: string;
  scheduled_at: Dayjs | null;
  scheduled_date: Dayjs | null;
  scheduled_time: Dayjs | null;
  highlight: string;
  tags: number[];
  text: string;
  thumbnail: File | string | null;
  gallery: (string | File | { image: string } | { id: number; image: string })[];
  removed_gallery: number[];
  attachments: File[];
  removed_attachments: number[];
}

interface CardRegisterForm {
  status: string;
  title: string;
  subtitle: string;
  slug: string;
  scheduled_at: Dayjs | null;
  scheduled_date: Dayjs | null;
  scheduled_time: Dayjs | null;
  text: string;
  image: File | string | null;
  card: number | null;
}

interface postersForm{
  status: string;
  title: string;
  description: string;
  slug: string;
  image: File | null;
  attachment: File | null;
}

interface categoryForm{
  status: string;
  title: string;
  description: string;
}

interface subCategoryForm{
  title: string;
  status: string;
  category: string;
}

interface recordsForm{
  status: string;
  title: string;
  attachment: File | null;
  category: string;
  sub_category: string;
}

interface cardsForm{
  status: string;
  title: string;
}

interface searchParams{
  searchTerm: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface bannerForm{
  status: string;
  alt: string;
  banner: File | null;
  banner_mobile: File | null;
  group: string;
  position: number | null;
  slug: string;
}

interface containerForm{
  status: string;
  show_title: boolean;
  title: string;
  background_color: string;
  title_color: string;
  redirect_button: string;
}

interface serviceButtonsForm{
  status: string;
  title: string;
  title_color: string;
  image: File | null;
  link: string;
  position: number | null;
}

interface quickAccessButtonsForm{
  status: string;
  title: string;
  title_color: string;
  image: File | null;
  background_color: string;
  group: string;
  position: number | null;
  link: string;
}

export type {
  WebsiteInformation,
  SocialMedia,
  EmailWebsite,
  ApiError,
  FAQ,
  User,
  Core,
  AreaOfDuty,
  TypeOfService,
  Unit,
  ServiceItem,
  PhoneItem,
  Tag,
  NewsForm,
  postersForm,
  categoryForm,
  subCategoryForm,
  recordsForm,
  cardsForm,
  searchParams,
  CardRegisterForm,
  bannerForm,
  containerForm,
  serviceButtonsForm,
  quickAccessButtonsForm,
};
