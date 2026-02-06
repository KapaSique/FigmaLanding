export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "step-1",
    title: "Сбор",
    description: "Ручной сбор в северных лесах Карелии в пик сезона.",
  },
  {
    id: "step-2",
    title: "Сушка",
    description: "Деликатная сушка сохраняет эфирные масла и аромат трав.",
  },
  {
    id: "step-3",
    title: "Купаж",
    description: "Точные пропорции и баланс вкуса в каждой партии.",
  },
  {
    id: "step-4",
    title: "Упаковка",
    description: "Герметичная упаковка защищает вкус и свежесть.",
  },
];
