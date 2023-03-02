import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;

type JobReq = {
  id: number;
  name: string;
};

type createJobProps = {
  company_avatar: string;
  company_desc: string;
  company_name: string;
  company_phone: string;
  company_url_linkedin: string;
  company_url_web: string;
  job_country: string;
  job_desc: string;
  job_offered: string;
  job_offered_id: string;
  job_region: string;
  job_requirements: JobReq[];
  job_work_place: string;
  job_working_day: string;
  token: string;
};

/**
 * 
 * Para agregar un trabajo a la database se utiliza este cuerpo de objeto

MÉTODO POST

{
  "title":"mi primo manolo",
  "description":"buenas",
  "image":"imagendelaempresa",
  "country":"argentina",
  "work_place":"Presencial",
  "working_day":" Full-time",
"company_name":"upaca"
  "tecnologies_job":[
    {"id_tecno":1,"years":1}
    ,
    {"id_tecno":2,"years":2}
    ,
    {"id_tecno":3,"years":3}
    ],
  "rol_job_id":1,
  "job_salary":{
    "price":600,
  }
}

https://backapijobs-production-ad45.up.railway.app/api/v1/jobs
 
 */

export const useJobPost = async (jobData: createJobProps) => {
  const newJobReq = jobData.job_requirements.map((tec) => {
    return { id_tecno: tec.id, years: 1 };
  });

  console.log(jobData);

  const job = {
    title: jobData.job_offered,
    description: jobData.job_desc,
    image: "",
    country: jobData.job_country,
    work_place: jobData.job_work_place,
    working_day: jobData.job_work_place,
    company_name: jobData.company_name,
    tecnologies_job: newJobReq,
    rol_job_id: jobData.job_offered_id,
    job_salary: {
      price: 0,
    },
  };

  try {
    const response = await globalThis.fetch(`${URL}jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jobData.token}`,
      },
      body: JSON.stringify(job),
    });
    const a = await response.json();
    return "ok";
  } catch (error) {
    console.log("hay un error", error);
  }
};
