export interface Job {
  id?: number;
  title?: string;
  location?: string;
  companyId?: number;
  name?: string;
  logo?: string;
  description?: string;
  experience?: string;
  skillsRequired?: any;
  jobDescription?: string;
  applied?: boolean;
}

interface Login {
  userName: string;
  passWord: string;
}
