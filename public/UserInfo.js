export class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        const nameElement = document.querySelector(nameSelector);
        const jobElement = document.querySelector(jobSelector);
        if (!nameElement || !jobElement) {
            throw new Error("No se encontraron los elementos de nombre y trabajo.");
        }
        this.nameElement = nameElement;
        this.jobElement = jobElement;
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent ?? "",
            job: this.jobElement.textContent ?? "",
        };
    }
    setUserInfo(userData) {
        this.nameElement.textContent = userData.name;
        this.jobElement.textContent = userData.job;
    }
}
