import type { DemandProps } from '@/types/demands'

export const mockDemands: DemandProps[] = [
  {
    id: '1',
    customerName: 'Edward Bates',
    location: 'Rua Comandante Valódia, Ingombota, Luanda',
    progress: 50,
    startDate: '12 Jan 2023',
    endDate: '20 Mar 2023',
    status: 'pending',
    team: [
      {
        name: 'Osvaldo Cariege',
        backgroundColor: 'bg-violet-600',
        avatarUrl: 'https://github.com/osvaldocariege06.png',
      },
      {
        name: 'Peter Weber',
        backgroundColor: 'bg-yellow-600',
        avatarUrl: 'https://github.com/Azielpascoal.png',
      },
      {
        name: 'Bernard Fowler',
        backgroundColor: 'bg-red-600',
        avatarUrl: 'https://github.com/gamemann.png',
      },
      {
        name: 'Walter Mullins',
        backgroundColor: 'bg-green-600',
        avatarUrl: 'https://github.com/FabriNeves.png',
      },
    ],
  },
  {
    id: '2',
    customerName: 'John Doe',
    location: 'Avenida 4 de Fevereiro, Marginal, Luanda',
    progress: 75,
    startDate: '15 Feb 2023',
    endDate: '30 Apr 2023',
    status: 'in_progress',
    team: [
      {
        name: 'Alice Smith',
        backgroundColor: 'bg-blue-600',
        avatarUrl: 'https://github.com/FabriNeves.png',
      },
      {
        name: 'Bob Johnson',
        backgroundColor: 'bg-purple-600',
        avatarUrl: 'https://github.com/mirraelly.png',
      },
    ],
  },
  {
    id: '3',
    customerName: 'Sarah Connor',
    location: 'Rua Rainha Ginga, Baixa de Luanda',
    progress: 100,
    startDate: '1 Mar 2023',
    endDate: '15 Apr 2023',
    status: 'completed',
    team: [
      {
        name: 'Tech Lead',
        backgroundColor: 'bg-green-600',
        avatarUrl: 'https://github.com/osvaldocariege06.png',
      },
      {
        name: 'Security Expert',
        backgroundColor: 'bg-blue-600',
        avatarUrl: 'https://github.com/Azielpascoal.png',
      },
    ],
  },
  {
    id: '4',
    customerName: 'Tony Stark',
    location: 'Bairro Miramar, Rua Mártires de Kifangondo, Luanda',
    progress: 30,
    startDate: '20 Apr 2023',
    endDate: '30 Jun 2023',
    status: 'in_progress',
    team: [
      {
        name: 'Innovation Team',
        backgroundColor: 'bg-yellow-600',
        avatarUrl: 'https://github.com/gamemann.png',
      },
      {
        name: 'R&D Squad',
        backgroundColor: 'bg-purple-600',
        avatarUrl: 'https://github.com/FabriNeves.png',
      },
    ],
  },
  {
    id: '5',
    customerName: 'Bruce Wayne',
    location: 'Avenida Ho Chi Minh, Bairro Alvalade, Luanda',
    progress: 0,
    startDate: '10 May 2023',
    endDate: '25 Jul 2023',
    status: 'cancelled',
    team: [
      {
        name: 'Project Lead',
        backgroundColor: 'bg-red-600',
        avatarUrl: 'https://github.com/mirraelly.png',
      },
    ],
  },
  {
    id: '6',
    customerName: 'Peter Parker',
    location: 'Rua Amílcar Cabral, Maianga, Luanda',
    progress: 15,
    startDate: '5 Jun 2023',
    endDate: '15 Aug 2023',
    status: 'pending',
    team: [
      {
        name: 'Media Team',
        backgroundColor: 'bg-violet-600',
        avatarUrl: 'https://github.com/osvaldocariege06.png',
      },
      {
        name: 'Design Squad',
        backgroundColor: 'bg-green-600',
        avatarUrl: 'https://github.com/Azielpascoal.png',
      },
    ],
  },
  {
    id: '7',
    customerName: 'Clark Kent',
    location: 'Largo do Ambiente, Talatona, Luanda Sul',
    progress: 90,
    startDate: '1 Jul 2023',
    endDate: '30 Sep 2023',
    status: 'in_progress',
    team: [
      {
        name: 'News Team',
        backgroundColor: 'bg-blue-600',
        avatarUrl: 'https://github.com/gamemann.png',
      },
      {
        name: 'Editorial Team',
        backgroundColor: 'bg-yellow-600',
        avatarUrl: 'https://github.com/FabriNeves.png',
      },
    ],
  },
] 