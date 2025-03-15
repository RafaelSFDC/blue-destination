// Dados mockados para demonstração
export const popularDestinations = [
  {
    id: "1",
    name: "Rio de Janeiro",
    location: "Brasil",
    image: "/placeholder.svg?height=300&width=500",
    price: 1299.9,
    rating: 4.8,
    tags: ["Praia", "Cultura"],
  },
  {
    id: "2",
    name: "Fernando de Noronha",
    location: "Brasil",
    image: "/placeholder.svg?height=300&width=500",
    price: 3599.9,
    rating: 4.9,
    tags: ["Praia", "Natureza"],
  },
  {
    id: "3",
    name: "Gramado",
    location: "Brasil",
    image: "/placeholder.svg?height=300&width=500",
    price: 1899.9,
    rating: 4.7,
    tags: ["Montanha", "Romântico"],
  },
  {
    id: "4",
    name: "Bonito",
    location: "Brasil",
    image: "/placeholder.svg?height=300&width=500",
    price: 1599.9,
    rating: 4.6,
    tags: ["Natureza", "Aventura"],
  },
];

export const promotions = [
  {
    id: "1",
    name: "Cancún",
    location: "México",
    image: "/placeholder.svg?height=300&width=500",
    price: 4999.9,
    discount: 25,
    rating: 4.7,
    tags: ["Praia", "All-inclusive"],
  },
  {
    id: "2",
    name: "Buenos Aires",
    location: "Argentina",
    image: "/placeholder.svg?height=300&width=500",
    price: 2899.9,
    discount: 15,
    rating: 4.5,
    tags: ["Cidade", "Cultura"],
  },
  {
    id: "3",
    name: "Orlando",
    location: "Estados Unidos",
    image: "/placeholder.svg?height=300&width=500",
    price: 5999.9,
    discount: 20,
    rating: 4.8,
    tags: ["Família", "Parques"],
  },
];

export const categories = [
  {
    id: "praia",
    name: "Praias",
    image: "/placeholder.svg?height=300&width=300",
    count: 48,
  },
  {
    id: "montanha",
    name: "Montanhas",
    image: "/placeholder.svg?height=300&width=300",
    count: 32,
  },
  {
    id: "cidade",
    name: "Cidades",
    image: "/placeholder.svg?height=300&width=300",
    count: 56,
  },
  {
    id: "aventura",
    name: "Aventura",
    image: "/placeholder.svg?height=300&width=300",
    count: 24,
  },
];

export const testimonials = [
  {
    name: "Ana Silva",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "São Paulo, SP",
    rating: 5,
    text: "Viagem incrível para Fernando de Noronha! Tudo foi perfeito, desde o atendimento até a hospedagem. Recomendo muito a BlueDestination!",
    date: "15/03/2023",
  },
  {
    name: "Carlos Oliveira",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Belo Horizonte, MG",
    rating: 4.5,
    text: "Pacote para Gramado com excelente custo-benefício. A agência cuidou de todos os detalhes e não tivemos nenhuma preocupação.",
    date: "22/05/2023",
  },
  {
    name: "Mariana Costa",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Segunda vez que viajo com a BlueDestination e novamente superou minhas expectativas. Atendimento personalizado e ótimas dicas!",
    date: "10/07/2023",
  },
];

export const blogPosts = [
  {
    id: "1",
    title: "10 praias paradisíacas no Brasil que você precisa conhecer",
    excerpt:
      "Descubra as praias mais bonitas do Brasil, com águas cristalinas e paisagens deslumbrantes que vão te deixar sem fôlego.",
    image: "/placeholder.svg?height=340&width=600",
    date: "10/03/2023",
    readTime: "5 min de leitura",
    author: {
      name: "Juliana Mendes",
      avatar: "/placeholder.svg?height=24&width=24",
    },
  },
  {
    id: "2",
    title: "Guia completo: como planejar sua viagem internacional",
    excerpt:
      "Tudo o que você precisa saber para organizar sua viagem internacional sem estresse, desde documentação até dicas de economia.",
    image: "/placeholder.svg?height=340&width=600",
    date: "25/04/2023",
    readTime: "8 min de leitura",
    author: {
      name: "Ricardo Almeida",
      avatar: "/placeholder.svg?height=24&width=24",
    },
  },
  {
    id: "3",
    title: "Viajando com crianças: destinos perfeitos para toda a família",
    excerpt:
      "Conheça os melhores destinos para viajar com crianças, com atrações para todas as idades e dicas para uma viagem tranquila.",
    image: "/placeholder.svg?height=340&width=600",
    date: "15/05/2023",
    readTime: "6 min de leitura",
    author: {
      name: "Fernanda Santos",
      avatar: "/placeholder.svg?height=24&width=24",
    },
  },
];
