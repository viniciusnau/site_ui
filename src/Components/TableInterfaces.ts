import { Dayjs } from "dayjs";

interface faq {
  id: number;
  status: string;
  question: string;
  answer?: string;
  author: string;
}

interface core {
  id: number;
  status: string;
  core_name: string;
  author: string;
}

interface areaOfDuty {
  id: number;
  status: string;
  dutie_name: string;
  author: string;
}

interface typeOfService {
  id: number;
  status: string;
  service_name: string;
  author: string;
}

interface ServiceItem {
  type_of_service: number;
  schedules: string;
}

interface PhoneItem {
  phone: string;
  is_whatsapp: boolean;
  department: string;
}

interface EmailItem {
  email: string;
}

interface unit {
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
  emails: EmailItem[];
  services: ServiceItem[];
  area_of_duty: number[];
  link_schedule_service: string;
  is_principal: boolean;
}

interface news {
  path: string | null;
  id: number;
  author: string;
  status: string;
  title: string;
  slug: string;
  subtitle: string;
  scheduled_at: Dayjs | null;
  scheduled_date: Dayjs | null;
  scheduled_time: Dayjs | null;
  highlight: string;
  tags: number[];
  text: string;
  thumbnail: File | null;
  gallery: File[];
  attachments: File[];
}

interface tags {
  id: number;
  status: string;
  author: string;
  name_tag: string;
  times_used: number;
}

interface posters {
  id: number;
  status: string;
  author: string;
  title: string;
  slug: string;
  description: string;
  image: File | null;
  attachment: File | null;
}

interface category {
  id: number;
  status: string;
  author: string;
  title: string;
  records_qty: number;
  description: string;
}

interface subCategory {
  id: number;
  status: string;
  author: string;
  title: string;
  category: string;
}

interface records {
  id: number;
  status: string;
  author: string;
  title: string;
  description: string;
  category: string;
  attachment: File | null;
  sub_category: string;
  slug: string;
}

interface CardDetail{
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  title: string;
  author: number;
}

interface cardRegister {
  path: string | null;
  card_detail: CardDetail
  id: number;
  author: string;
  status: string;
  title: string;
  slug: string;
  subtitle: string;
  scheduled_at: Dayjs | null;
  scheduled_date: Dayjs | null;
  scheduled_time: Dayjs | null;
  text: string;
  image: File | null;
}

interface banner {
  id: number;
  status: string;
  author: string;
  alt: string;
  position: number;
  banner: File | null;
  banner_mobile: File | null;
  group: string;
  slug: string;
}

interface container {
  id: number;
  status: string;
  author: string;
  show_title: boolean;
  title: string;
  title_color: string;
  background_color: string;
  redirect_button: string;
}

interface servicesButtons {
  id: number;
  status: string;
  author: string;
  position: number;
  image: File | null;
  link: string;
  title: string;
  title_color: string;
}

interface quickAccessButtons {
  id: number;
  status: string;
  author: string;
  position: number;
  title: string;
  title_color: string;
  link: string;
  image: File | null;
  background_color: string;
  group: string;
}

export type {
  faq,
  core,
  areaOfDuty,
  typeOfService,
  unit,
  news,
  tags,
  posters,
  category,
  subCategory,
  records,
  cardRegister,
  banner,
  container,
  servicesButtons,
  quickAccessButtons,
};
