export interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

export interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;

  constructor({ nameSelector, jobSelector }: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(nameSelector);
    const jobElement = document.querySelector<HTMLElement>(jobSelector);

    if (!nameElement || !jobElement) {
      throw new Error("No se encontraron los elementos de nombre y trabajo.");
    }

    this.nameElement = nameElement;
    this.jobElement = jobElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent ?? "",
      job: this.jobElement.textContent ?? "",
    };
  }

  public setUserInfo(userData: UserData): void {
    this.nameElement.textContent = userData.name;
    this.jobElement.textContent = userData.job;
  }
}
