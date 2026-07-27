export type Representative = {
  name: string;
  phone: string;
  base?: string;
};

export type Territory = {
  id: string;
  region: string;
  representatives: Representative[];
};

export const territories: Territory[] = [
  {
    id: "parana-noroeste",
    region: "Paraná — Noroeste",
    representatives: [
      { name: "Waldir Américo Sinti", phone: "(44) 98402-9723" },
      { name: "Adivaldo Girotto", phone: "(44) 99967-5050" },
    ],
  },
  {
    id: "parana-curitiba",
    region: "Paraná — Curitiba e região",
    representatives: [
      { name: "Helton Luiz dos Santos", phone: "(41) 99877-0683" },
    ],
  },
  {
    id: "mato-grosso-do-sul",
    region: "Mato Grosso do Sul",
    representatives: [
      { name: "Francielle M. Migliorini", phone: "(44) 99938-7351" },
      { name: "Jean", phone: "(44) 99133-2021" },
    ],
  },
  {
    id: "santa-catarina",
    region: "Santa Catarina",
    representatives: [
      { name: "Jean", phone: "(44) 99133-2021" },
    ],
  },
  {
    id: "sao-paulo",
    region: "São Paulo",
    representatives: [
      { name: "Luis Enrique Vila", phone: "(17) 98115-0078" },
    ],
  },
  {
    id: "parana",
    region: "Paraná",
    representatives: [
      { name: "Vitor Barreto Gouveia", phone: "(44) 99133-3335" },
    ],
  },
  {
    id: "norte-velho-parana",
    region: "Norte Velho do Paraná",
    representatives: [
      {
        name: "Sebastião Colli",
        phone: "(43) 99111-4161",
      },
    ],
  },
];
