export type Representative = {
  name: string;
  phone: string;
  base?: string;
  validated: boolean;
  whatsappUrl?: string;
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
      { name: "Waldir Américo Sinti", phone: "(44) 9.98402-9723", validated: false },
      { name: "Adivaldo Girotto", phone: "(44) 9.9967-5050", validated: false },
    ],
  },
  {
    id: "parana-curitiba",
    region: "Paraná — Curitiba e região",
    representatives: [
      { name: "Helton Luiz dos Santos", phone: "(41) 9.99877-0683", validated: false },
    ],
  },
  {
    id: "mato-grosso-do-sul",
    region: "Mato Grosso do Sul",
    representatives: [
      { name: "Francielle M. Migliorini", phone: "(44) 9.9938-7351", validated: false },
    ],
  },
  {
    id: "sao-paulo",
    region: "São Paulo",
    representatives: [
      { name: "Luis Enrique Vila", phone: "(17) 9.98115-0078", validated: false },
    ],
  },
  {
    id: "parana",
    region: "Paraná",
    representatives: [
      { name: "Vitor Barreto Gouveia", phone: "(44) 9.9133-3335", validated: false },
    ],
  },
  {
    id: "norte-velho-parana",
    region: "Norte Velho do Paraná",
    representatives: [
      {
        name: "Antônio Octávio",
        phone: "(44) 9.9915-2240",
        base: "Maringá-PR",
        validated: false,
      },
    ],
  },
];
