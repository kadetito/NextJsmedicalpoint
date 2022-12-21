import bcrypt from "bcryptjs";

interface SeedCases {
  title: string;
  description: string;
  images: string[];
  slug: string;
  created_by: ICreatedBy;
  dateReview: string;
  hourReview: string;
  applicants: IApplicants[];
  assignedTo?: IAssignedTo;
  tags: string[];
  isAssigned: string;
}

// interface SeedMedics {
//   name: string;
//   number_col: string;
//   images: string[];
//   slug: string;
//   birthDate: string;
//   expertise: string;
//   tags: string[];
// }

interface SeedPacients {
  name: string;
  dni: string;
  images: string[];
  slug: string;
  birthDate: string;
  tags: string[];
  hystorial: IHystoric[];
}

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
  number_col: string;
  images: string[];
  slug: string;
  birthDate: string;
  expertise: string;
  tags: string[];
}

type ICreatedBy = {
  _id: string;
  name: string;
  number_col: string;
};
type IAssignedTo = {
  _id: string;
  name: string;
  number_col: string;
};

type IApplicants = {
  _id: string;
  name: string;
  number_col: string;
};

type IHystoric = {
  uid: string;
  description: string;
  dateCase: string;
};

interface SeedData {
  users: SeedUser[];
  cases: SeedCases[];
  // medics: SeedMedics[];
  pacients: SeedPacients[];
}

export const initialData: SeedData = {
  users: [
    {
      name: "Miguel Romero Dalmau",
      email: "fernando@google.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
      number_col: "PLJK88675",
      images: ["villegasscaled.jpg", "1740176-00-A_1.jpg"],
      slug: "miguel_romero_dalmau_pljk88675",
      birthDate: "1974-08-25",
      expertise: "Ginecología",
      tags: ["ginecologia", "pediatria"],
    },
    {
      name: "Javier Gallarriga Dalmau",
      email: "eduardo@google.com",
      password: bcrypt.hashSync("123456"),
      role: "client",
      number_col: "HJSH88675",
      images: ["sexologo-pedro-villegas.jpg", "1740176-00-A_1.jpg"],
      slug: "javier_gallarriga_dalmau_hjsh88675",
      birthDate: "1979-02-15",
      expertise: "Psicología",
      tags: ["psicologia", "pediatria"],
    },
  ],
  cases: [
    {
      title: "Consulta pediatría",
      slug: "consulta_prediatria_201220221630",
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
      images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
      created_by: {
        _id: "1111111111",
        name: "Vicens Albert Martínez",
        number_col: "PPWUH88675",
      },

      dateReview: "2022-12-20",
      hourReview: "16:30",

      applicants: [
        {
          _id: "63990d9a7130e3786853e5e0",
          name: "Miguel Romero Dalmau",
          number_col: "PLJK88675",
        },
        {
          _id: "63990d9a7130e3786853e5e1",
          name: "Javier Gallarriga Dalmau",
          number_col: "HJSH88675",
        },
      ],
      assignedTo: {
        _id: "",
        name: "",
        number_col: "",
      },
      tags: ["pediatría", "dermatologia", "psicologia"],
      isAssigned: "false",
    },
    {
      title: "Revisión de analisis Diabetes",
      slug: "revision_analisis_diabetes161220221550",
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
      images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
      created_by: {
        _id: "11111111111111",
        name: "Javier Gallarriga Dalmau",
        number_col: "HJSH88675",
      },

      dateReview: "2022-12-16",
      hourReview: "15:50",

      applicants: [],

      assignedTo: {
        _id: "2222222222",
        name: "Miguel Romero Dalmau",
        number_col: "PLJK88675",
      },
      tags: ["primaria", "dermatologia", "psicologia"],
      isAssigned: "true",
    },
  ],

  pacients: [
    {
      name: "Rodolfo Agustín Paherisa Cabal",
      dni: "54896569D",
      images: [
        "juanmiguelsanjuanyjover.jpg",
        "juanmiguelsanjuanyjover_web_56.jpg",
      ],
      birthDate: "1952-09-15",
      tags: ["tag1", "tag2"],
      slug: "rodolfo_agustin_paherisa_cabal_54896569d",
      hystorial: [
        {
          uid: "63990d9a7130e3786853e5e7",
          description:
            "The primary goal of obtaining a medical history from the patient is to understand the state of health of the patient further and to determine within the history is related to any acute complaints to direct you toward a diagnosis[1]. The secondary goal is to gain information to prevent potential harm to the patient during treatment, for instance, avoiding medications to which the patient has an allergy or avoiding administering or prescribing a medication the patient has previously taken and had an adverse reaction.\n\nOften information from the history can direct treatment or may indicate a need for further workup of patient complaints. The history may also inform the provider of certain aspects of the patient's health which will direct care, especially avoidance of potential harm to the patient with regard to allergies or previous treatments limiting care at the time of the encounter.\n\nFamily history may help risk-stratify patients with conditions with genetic links.",
          dateCase: "1987-11-10T23:00:00.000Z",
        },
      ],
    },
    {
      name: "Felisa Carmina Delencioso",
      dni: "54896569D",
      images: ["felisamorenoortega2.jpg", "felisamorenoortega.jpg"],
      birthDate: "1952-09-15",
      tags: ["tag1", "tag2"],
      slug: "rodolfo_agustin_paherisa_cabal_54896569d",
      hystorial: [
        {
          uid: "63990d9a7130e3786853e5e7",
          description:
            "The primary goal of obtaining a medical history from the patient is to understand the state of health of the patient further and to determine within the history is related to any acute complaints to direct you toward a diagnosis[1]. The secondary goal is to gain information to prevent potential harm to the patient during treatment, for instance, avoiding medications to which the patient has an allergy or avoiding administering or prescribing a medication the patient has previously taken and had an adverse reaction.\n\nOften information from the history can direct treatment or may indicate a need for further workup of patient complaints. The history may also inform the provider of certain aspects of the patient's health which will direct care, especially avoidance of potential harm to the patient with regard to allergies or previous treatments limiting care at the time of the encounter.\n\nFamily history may help risk-stratify patients with conditions with genetic links.",
          dateCase: "1987-11-10T23:00:00.000Z",
        },
        {
          uid: "63990d9a7130e3786853e5e5",
          description:
            "Medical history from the patient is to understand the state of health of the patient further and to determine within the history is related to any acute complaints to direct you toward a diagnosis[1]. The secondary goal is to gain information to prevent potential harm to the patient during treatment, for instance, avoiding medications to which the patient has an allergy or avoiding administering or prescribing a medication the patient has previously taken and had an adverse reaction.\n\nOften information from the history can direct treatment or may indicate a need for further workup of patient complaints. The history may also inform the provider of certain aspects of the patient's health which will direct care, especially avoidance of potential harm to the patient with regard to allergies or previous treatments limiting care at the time of the encounter.\n\nFamily history may help risk-stratify patients with conditions with genetic links.",
          dateCase: "1990-11-10T23:00:00.000Z",
        },
      ],
    },

    {
      name: "Josefa Carlos Martinez Alamillo",
      dni: "546569D",
      images: ["felisalafuente2.jpg", "felisalafuente1.jpg"],
      birthDate: "1932-09-15",
      tags: ["tag1", "tag2"],
      slug: "rodolfo_agustin_paherisa_cabal_54896569d",
      hystorial: [
        {
          uid: "63990d9a7130e3786853e5ea",
          description:
            "Communicating the patient's medical history to other medical professionals is important and can have significant implications in preventing medical errors. When recording the patient's medical history in the chart, accuracy may reduce medical errors or improper diagnoses. An accurate medical history will cross through all aspects of the interprofessional team involved in the care of the patient.",
          dateCase: "1987-11-10T23:00:00.000Z",
        },
        {
          uid: "63990d9a7130e3786853e5eb",
          description:
            "Patient allergies are a crucial aspect of history gathering as this may have potentially life-threatening consequences. It is critical to always ask clearly if the patient has any medication allergies and if they do, clarify the reaction they had to the medication.\n\nMedication history is also important as patients take more and more medications and drug-drug interactions must be avoided. ",
          dateCase: "1990-12-11T23:00:00.000Z",
        },
      ],
    },
  ],
};
