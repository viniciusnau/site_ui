import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { PATH } from "../PATH";
import {
  WebsiteInformation,
  SocialMedia,
  EmailWebsite,
  FAQ,
  User,
  Core,
  AreaOfDuty,
  TypeOfService,
  Unit,
  Tag,
  NewsForm,
  postersForm,
  categoryForm,
  subCategoryForm,
  recordsForm,
  cardsForm,
  bannerForm,
  containerForm,
  serviceButtonsForm,
  quickAccessButtonsForm,
  headerForm,
  UnityAndCores,
} from "./interfaces";

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = PATH.base;
  }

  private getAuthHeaders(): AxiosRequestConfig["headers"] {
    const apiToken = sessionStorage.getItem("apiToken");
    const credentials = sessionStorage.getItem("credentials");

    if (apiToken) {
      return {
        Authorization: `Token ${apiToken}`,
      };
    }

    if (credentials) {
      return {
        Authorization: `Basic ${credentials}`,
      };
    }

    throw new Error("Token de autenticação não encontrado");
  }

  private async get<T>(
    endpoint: string,
    requireAuth: boolean = false
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {};

      if (requireAuth) {
        config.headers = this.getAuthHeaders();
      }

      const response: AxiosResponse<T> = await axios.get(
        `${this.baseURL}${endpoint}`,
        config
      );
      return response.data;
    } catch (error: any) {
      console.error(`Erro na requisição GET ${endpoint}:`, error);
      throw error;
    }
  }

  private async patch<T>(
    endpoint: string,
    body?: any,
    requireAuth: boolean = true
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {};

      if (requireAuth) {
        config.headers = this.getAuthHeaders();
      }

      const response: AxiosResponse<T> = await axios.patch(
        `${this.baseURL}${endpoint}`,
        body,
        config
      );
      return response.data;
    } catch (error: any) {
      console.error(`Erro na requisição PATCH ${endpoint}:`, error);
      throw error;
    }
  }

  private async post<T>(
    endpoint: string,
    body: any,
    requireAuth: boolean = true
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {};

      if (requireAuth) {
        config.headers = this.getAuthHeaders();
      }

      const response: AxiosResponse<T> = await axios.post(
        `${this.baseURL}${endpoint}`,
        body,
        config
      );
      return response.data;
    } catch (error: any) {
      console.error(`Erro na requisição POST ${endpoint}:`, error);
      throw error;
    }
  }

  private async delete<T>(
    endpoint: string,
    requireAuth: boolean = true
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {};

      if (requireAuth) {
        config.headers = this.getAuthHeaders();
      }

      const response: AxiosResponse<T> = await axios.delete(
        `${this.baseURL}${endpoint}`,
        config
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async getWebsiteInformation(): Promise<WebsiteInformation[]> {
    return this.get<WebsiteInformation[]>("/website-information/");
  }

  async patchWebsiteInformation(
    body: Partial<WebsiteInformation>
  ): Promise<WebsiteInformation> {
    return this.patch<WebsiteInformation>("/website-information/", body);
  }

  async getSocialMedia(): Promise<SocialMedia[]> {
    return this.get<SocialMedia[]>("/social-media/");
  }

  async patchSocialMedia(
    body: Partial<SocialMedia>,
    id: number
  ): Promise<SocialMedia> {
    return this.patch<SocialMedia>(`/social-media/${id}/`, body);
  }

  async patchMultipleSocialMedia(
    updates: Array<{ body: Partial<SocialMedia>; id: number }>
  ): Promise<SocialMedia[]> {
    try {
      const promises = updates.map(({ body, id }) =>
        this.patchSocialMedia(body, id)
      );

      const results = await Promise.allSettled(promises);

      const failed = results.filter((result) => result.status === "rejected");
      if (failed.length > 0) {
        throw new Error(
          `${failed.length} atualizações de redes sociais falharam`
        );
      }

      return this.getSocialMedia();
    } catch (error) {
      console.error("Erro ao atualizar múltiplas redes sociais:", error);
      throw error;
    }
  }

  async getEmailWebsite(): Promise<EmailWebsite[]> {
    return this.get<EmailWebsite[]>("/email-website/");
  }

  async patchEmailWebsite(
    body: { location: string; email: string },
    id: number
  ): Promise<EmailWebsite> {
    return this.patch<EmailWebsite>(`/email-website/${id}/`, body);
  }

  async patchMultipleEmailWebsite(
    updates: Array<{ body: { location: string; email: string }; id: number }>
  ): Promise<EmailWebsite[]> {
    try {
      const promises = updates.map(({ body, id }) =>
        this.patchEmailWebsite(body, id)
      );

      const results = await Promise.allSettled(promises);

      const failed = results.filter((result) => result.status === "rejected");
      if (failed.length > 0) {
        throw new Error(`${failed.length} atualizações de emails falharam`);
      }

      return this.getEmailWebsite();
    } catch (error) {
      console.error("Erro ao atualizar múltiplos emails:", error);
      throw error;
    }
  }

  async getFAQ(published?: string): Promise<FAQ> {
    const query = published ? `?published=${published}` : ""; 
    return this.get<FAQ>(`/faq/${query}`);
  }

  async patchFAQ(body: Partial<FAQ>, id: number): Promise<FAQ> {
    return this.patch<FAQ>(`/faq/${id}/`, body);
  }

  async postFAQ(body: { question: string; answer: string }): Promise<FAQ> {
    return this.post<FAQ>(`/faq/`, body);
  }

  async deleteFAQ(id: number): Promise<FAQ> {
    return this.delete<FAQ>(`/faq/${id}/`);
  }

  async getUsersByModels(model: string): Promise<User[]> {
    return this.get<User[]>(`/authors/${model}/`, true);
  }

  async getCore(published?: string): Promise<Core[]> {
    const query = published ? `?published=${published}` : "";
    return this.get<Core[]>(`/core/${query}`);
  }

  async postCore(core: string): Promise<Core> {
    return this.post<Core>(`/core/`, core);
  }

  async patchCore(body: Partial<Core>, id: number): Promise<Core> {
    return this.patch<Core>(`/core/${id}/`, body);
  }

  async deleteCore(id: number): Promise<Core> {
    return this.delete<Core>(`/core/${id}/`);
  }

  async getAreaOfDuty(): Promise<AreaOfDuty[]> {
    return this.get<AreaOfDuty[]>(`/area-of-duty/`);
  }

  async postAreaOfDuty(dutie: string): Promise<AreaOfDuty> {
    return this.post<AreaOfDuty>(`/area-of-duty/`, dutie);
  }

  async patchAreaOfDuty(
    body: Partial<AreaOfDuty>,
    id: number
  ): Promise<AreaOfDuty> {
    return this.patch<AreaOfDuty>(`/area-of-duty/${id}/`, body);
  }

  async deleteAreaOfDuty(id: number): Promise<AreaOfDuty> {
    return this.delete<AreaOfDuty>(`/area-of-duty/${id}/`);
  }

  async getTypeOfService(): Promise<TypeOfService[]> {
    return this.get<TypeOfService[]>(`/type-of-service/`);
  }

  async postTypeOfService(service: string): Promise<TypeOfService> {
    return this.post<TypeOfService>(`/type-of-service/`, service);
  }

  async patchTypeOfService(
    body: Partial<TypeOfService>,
    id: number
  ): Promise<TypeOfService> {
    return this.patch<TypeOfService>(`/type-of-service/${id}/`, body);
  }

  async deleteTypeOfService(id: number): Promise<TypeOfService> {
    return this.delete<TypeOfService>(`/type-of-service/${id}/`);
  }

  async getUnit(published?: string): Promise<Unit[]> {
    const query = published ? `?published=${published}` : "";
    return this.get<Unit[]>(`/unit/${query}`);
  }

  async postUnit(body: any): Promise<Unit> {
    return this.post<Unit>(`/unit/`, body);
  }

  async patchUnit(body: Partial<Unit>, id: number): Promise<Unit> {
    return this.patch<Unit>(`/unit/${id}/`, body);
  }

  async deleteUnit(id: number): Promise<Unit> {
    return this.delete<Unit>(`/unit/${id}/`);
  }

  async getTag(): Promise<Tag> {
    return this.get<Tag>(`/tag/`, false);
  }

  async postTag(body: string): Promise<Tag> {
    return this.post<Tag>(`/tag/`, body);
  }

  async patchTag(body: string, id: number): Promise<Tag> {
    return this.patch<Tag>(`/tag/${id}/`, body);
  }

  async deleteTag(id: number): Promise<Tag> {
    return this.delete<Tag>(`/tag/${id}/`);
  }

  async getNews(published?: string): Promise<NewsForm> {
    const query = published ? `?published=${published}` : "";
    return this.get<NewsForm>(`/news/${query}`);
  }

  async postNews(body: any): Promise<NewsForm> {
    return this.post<NewsForm>(`/news/`, body);
  }

  async patchNews(body: any, id: number): Promise<NewsForm> {
    return this.patch<NewsForm>(`/news/${id}/`, body);
  }

  async deleteNews(id: number): Promise<NewsForm> {
    return this.delete<NewsForm>(`/news/${id}/`);
  }

  async getCardRegister(): Promise<NewsForm> {
    return this.get<NewsForm>(`/card-register/`);
  }

  async postCardRegister(body: any): Promise<NewsForm> {
    return this.post<NewsForm>(`/card-register/`, body);
  }

  async patchCardRegister(body: any, id: number): Promise<NewsForm> {
    return this.patch<NewsForm>(`/card-register/${id}/`, body);
  }

  async deleteCardRegister(id: number): Promise<NewsForm> {
    return this.delete<NewsForm>(`/card-register/${id}/`);
  }

  async getPosters(): Promise<postersForm> {
    return this.get<postersForm>(`/posters/`);
  }

  async postPosters(body: any): Promise<postersForm> {
    return this.post<postersForm>(`/posters/`, body);
  }

  async patchPosters(body: any, id: number): Promise<postersForm> {
    return this.patch<postersForm>(`/posters/${id}/`, body);
  }

  async deletePosters(id: number): Promise<postersForm> {
    return this.delete<postersForm>(`/posters/${id}/`);
  }

async getCategory(ids?: number[]): Promise<categoryForm> {
  if (ids && ids.length > 0) {
    return this.get<categoryForm>(`/modules/category/?ids=${ids.join(",")}`);
  }
  return this.get<categoryForm>("/modules/category/");
}

  async postCategory(body: any): Promise<categoryForm> {
    return this.post<categoryForm>(`/modules/category/`, body);
  }

  async patchCategory(body: any, id: number): Promise<categoryForm> {
    return this.patch<categoryForm>(`/modules/category/${id}/`, body);
  }

  async deleteCategory(id: number): Promise<categoryForm> {
    return this.delete<categoryForm>(`/modules/category/${id}/`);
  }

  async getSubCategory(): Promise<subCategoryForm> {
    return this.get<subCategoryForm>(`/modules/sub-category/`);
  }

  async postSubCategory(body: any): Promise<subCategoryForm> {
    return this.post<subCategoryForm>(`/modules/sub-category/`, body);
  }

  async patchSubCategory(body: any, id: number): Promise<subCategoryForm> {
    return this.patch<subCategoryForm>(`/modules/sub-category/${id}/`, body);
  }

  async deleteSubCategory(id: number): Promise<subCategoryForm> {
    return this.delete<subCategoryForm>(`/modules/sub-category/${id}/`);
  }

  async getRecords(): Promise<recordsForm> {
    return this.get<recordsForm>(`/modules/records/`);
  }

  async postRecords(body: any): Promise<recordsForm> {
    return this.post<recordsForm>(`/modules/records/`, body);
  }

  async patchRecords(body: any, id: number): Promise<recordsForm> {
    return this.patch<recordsForm>(`/modules/records/${id}/`, body);
  }

  async deleteRecords(id: number): Promise<recordsForm> {
    return this.delete<recordsForm>(`/modules/records/${id}/`);
  }

  async getCards(id?: string): Promise<cardsForm> {
    return this.get<cardsForm>(`/cards/${id ?? ''}`);
  }

  async postCards(body: any): Promise<cardsForm> {
    return this.post<recordsForm>(`/cards/`, body);
  }

  async patchCards(body: any, id: number): Promise<cardsForm> {
    return this.patch<recordsForm>(`/cards/${id}/`, body);
  }

  async deleteCards(id: number): Promise<cardsForm> {
    return this.delete<recordsForm>(`/cards/${id}/`);
  }

  async getMe(body: { username: string; password: string }) {
    try {
      const headers = {
        headers: {
          Authorization: "Basic " + btoa(`${body.username}:${body.password}`),
        },
      };

      const response: AxiosResponse<any> = await axios.get(
          `${this.baseURL}/me/`,
          headers
      );

      if (body.username && body.password) {
        sessionStorage.setItem("username", body.username);
        sessionStorage.setItem("password", body.password);
        sessionStorage.setItem(
            "credentials",
            btoa(`${body.username}:${body.password}`)
        );
      }

      return response;
    } catch (error: any) {
      console.error("Erro em getMe:", error);
      throw error;
    }
  }

  async getBanner(published?: string): Promise<bannerForm>{
    const query = published ? `?published=${published}` : "";
    return this.get<bannerForm>(`/banner/${query}`);
  }
  
  async postBanner(data: any): Promise<bannerForm>{
    return this.post<bannerForm>(`/banner/`, data)
  }

  async patchBanner(data: any, id: number): Promise<bannerForm>{
    return this.patch<bannerForm>(`/banner/${id}/`, data)
  }

  async deleteBanner(id: number): Promise<bannerForm>{
    return this.delete<bannerForm>(`/banner/${id}/`)
  }

  async getContainer(): Promise<containerForm>{
    return this.get<containerForm>(`/container/`)
  }

  async postContainer(data: any): Promise<containerForm>{
    return this.post<containerForm>(`/container/`, data)
  }

  async patchContainer(data: any, id: number): Promise<containerForm>{
    return this.patch<containerForm>(`/container/${id}/`, data)
  }

  async deleteContainer(id: number):Promise<containerForm>{
    return this.delete<containerForm>(`/container/${id}`)
  }

  async getServiceButtons(): Promise<serviceButtonsForm>{
    return this.get<serviceButtonsForm>(`/service-buttons/`)
  }

  async postServiceButtons(data: any): Promise<serviceButtonsForm>{
    return this.post<serviceButtonsForm>(`/service-buttons/`, data)
  }

  async patchServiceButtons(data: any, id: number): Promise<serviceButtonsForm>{
    return this.patch<serviceButtonsForm>(`/service-buttons/${id}/`, data)
  }

  async deleteServiceButtons(id: number): Promise<serviceButtonsForm>{
    return this.delete<serviceButtonsForm>(`/service-buttons/${id}/`)
  }

  async getQuickAccessButtons(): Promise<quickAccessButtonsForm>{
    return this.get<quickAccessButtonsForm>(`/quick-access-buttons/`)
  }

  async postQuickAccessButtons(data: any): Promise<quickAccessButtonsForm>{
    return this.post<quickAccessButtonsForm>(`/quick-access-buttons/`, data)
  }

  async patchQuickAccessButtons(data: any, id: number): Promise<quickAccessButtonsForm>{
    return this.patch<quickAccessButtonsForm>(`/quick-access-buttons/${id}/`, data)
  }

  async deleteQuickAccessButtons(id: number): Promise<quickAccessButtonsForm>{
    return this.delete<quickAccessButtonsForm>(`/quick-access-buttons/${id}/`)
  }

  async getUnityAndCores(published?: string): Promise<UnityAndCores> {
    const query = published ? `?published=${published}` : ""; 
    return this.get<UnityAndCores>(`/cores-units/${query}`);
  }

  async getPages(): Promise<any> {
    return this.get<any>(`/page/`, true);
  }

  async getPageById(id: number): Promise<any> {
    return this.get<any>(`/page/${id}/`, true);
  }

  async postPage(body: any): Promise<any> {
    return this.post<any>(`/page/`, body, true);
  }

  async patchPage(body: any, id: number): Promise<any> {
    return this.patch<any>(`/page/${id}/`, body, true);
  }

  async deletePage(id: number): Promise<any> {
    return this.delete<any>(`/page/${id}/`, true);
  }

  async getHeader(): Promise<headerForm>{
    return this.get<headerForm>(`/header/`)
  }

  async postHeader(data: any): Promise<headerForm>{
    return this.post<headerForm>(`/header/`, data)
  }

  async patchHeader(data: any, id: number): Promise<headerForm>{
    return this.patch<headerForm>(`/header/${id}/`, data)
  }

  async deleteHeader(id: number): Promise<headerForm>{
    return this.delete<headerForm>(`/header/${id}/`)
  }
}

const apiService = new ApiService();

const services = {
  getWebsiteInformation: () => apiService.getWebsiteInformation(),
  patchWebsiteInformation: (body: any) =>
    apiService.patchWebsiteInformation(body),
  getSocialMedia: () => apiService.getSocialMedia(),
  patchSocialMedia: (body: any, id: number) =>
    apiService.patchSocialMedia(body, id),
  getEmailWebsite: () => apiService.getEmailWebsite(),
  patchEmailWebsite: (body: any, id: number) =>
    apiService.patchEmailWebsite(body, id),
  getFAQ: (published?: string) => apiService.getFAQ(published),
  postFAQ: (body: any) => apiService.postFAQ(body),
  patchFAQ: (body: any, id: number) => apiService.patchFAQ(body, id),
  deleteFAQ: (id: number) => apiService.deleteFAQ(id),
  getUsersByModels: (model: string) => apiService.getUsersByModels(model),
  getCore: (published?: string) => apiService.getCore(published),
  postCore: (core: string) => apiService.postCore(core),
  patchCore: (body: any, id: number) => apiService.patchCore(body, id),
  deleteCore: (id: number) => apiService.deleteCore(id),
  getAreaOfDuty: () => apiService.getAreaOfDuty(),
  postAreaOfDuty: (duty: string) => apiService.postAreaOfDuty(duty),
  patchAreaOfDuty: (body: any, id: number) =>
    apiService.patchAreaOfDuty(body, id),
  deleteAreaOfDuty: (id: number) => apiService.deleteAreaOfDuty(id),
  getTypeOfService: () => apiService.getTypeOfService(),
  postTypeOfService: (service: string) => apiService.postTypeOfService(service),
  patchTypeOfService: (body: any, id: number) =>
    apiService.patchTypeOfService(body, id),
  deleteTypeOfService: (id: number) => apiService.deleteTypeOfService(id),
  getUnit: (published?: string) => apiService.getUnit(published),
  postUnit: (body: any) => apiService.postUnit(body),
  patchUnit: (body: any, id: number) => apiService.patchUnit(body, id),
  deleteUnit: (id: number) => apiService.deleteUnit(id),
  getTag: () => apiService.getTag(),
  postTag: (body: string) => apiService.postTag(body),
  patchTag: (body: string, id: number) => apiService.patchTag(body, id),
  deleteTag: (id: number) => apiService.deleteTag(id),
  getNews: (published?: string) => apiService.getNews(published),
  postNews: (body: any) => apiService.postNews(body),
  patchNews: (body: any, id: number) => apiService.patchNews(body, id),
  deleteNews: (id: number) => apiService.deleteNews(id),
  getCardRegister: () => apiService.getCardRegister(),
  postCardRegister: (body: any) => apiService.postCardRegister(body),
  patchCardRegister: (body: any, id: number) => apiService.patchCardRegister(body, id),
  deleteCardRegister: (id: number) => apiService.deleteCardRegister(id),
  getPosters: () => apiService.getPosters(),
  postPosters: (body: any) => apiService.postPosters(body),
  patchPosters: (body: any, id: number) => apiService.patchPosters(body, id),
  deletePosters: (id: number) => apiService.deletePosters(id),
  getCategory: (ids?:number[]) => apiService.getCategory(ids),
  postCategory: (body: any) => apiService.postCategory(body),
  patchCategory: (body: any, id: number) => apiService.patchCategory(body, id),
  deleteCategory: (id: number) => apiService.deleteCategory(id),
  getSubCategory: () => apiService.getSubCategory(),
  postSubCategory: (body: any) => apiService.postSubCategory(body),
  patchSubCategory: (body: any, id: number) =>
    apiService.patchSubCategory(body, id),
  deleteSubCategory: (id: number) => apiService.deleteSubCategory(id),
  getRecords: () => apiService.getRecords(),
  postRecords: (body: any) => apiService.postRecords(body),
  patchRecords: (body: any, id: number) => apiService.patchRecords(body, id),
  deleteRecords: (id: number) => apiService.deleteRecords(id),
  getCards: (id?: string) => apiService.getCards(id),
  postCards: (body: any) => apiService.postCards(body),
  patchCards: (body: any, id: number) => apiService.patchCards(body, id),
  deleteCards: (id: number) => apiService.deleteCards(id),
  getMe: (body: { username: string; password: string }) => apiService.getMe(body),
  getBanner: (published?: string) => apiService.getBanner(published),
  postBanner: (data: any) => apiService.postBanner(data),
  patchBanner: (data: any, id: number) => apiService.patchBanner(data, id),
  deleteBanner: (id: number) => apiService.deleteBanner(id),
  getContainer: () => apiService.getContainer(),
  postContainer: (data: any) => apiService.postContainer(data),
  patchContainer: (data: any, id: number) => apiService.patchContainer(data, id),
  deleteContainer: (id: number) => apiService.deleteContainer(id),
  getServiceButtons: () => apiService.getServiceButtons(),
  postServiceButtons: (data: any) => apiService.postServiceButtons(data),
  patchServiceButtons: (data: any, id: number) => apiService.patchServiceButtons(data, id),
  deleteServiceButtons: (id: number) => apiService.deleteServiceButtons(id),
  getQuickAccessButtons: () => apiService.getQuickAccessButtons(),
  postQuickAccessButtons: (data: any) => apiService.postQuickAccessButtons(data),
  patchQuickAccessButtons: (data: any, id: number) => apiService.patchQuickAccessButtons(data, id),
  deleteQuickAccessButtons: (id: number) => apiService.deleteQuickAccessButtons(id),
  getUnityAndCores: (published?: string) => apiService.getUnityAndCores(published),
  getPages: () => apiService.getPages(),
  getPageById: (id: number) => apiService.getPageById(id),
  postPage: (body: any) => apiService.postPage(body),
  patchPage: (body: any, id: number) => apiService.patchPage(body, id),
  deletePage: (id: number) => apiService.deletePage(id),
  getHeader: () => apiService.getHeader(),
  postHeader: (data: any) => apiService.postHeader(data),
  patchHeader: (data: any, id: number) => apiService.patchHeader(data, id),
  deleteHeader: (id: number) => apiService.deleteHeader(id),
};

export default services;
export { apiService };
