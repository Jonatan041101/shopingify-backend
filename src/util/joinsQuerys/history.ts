export const includeHistoryWithProductComplete = {
  include: {
    product: {
      include: {
        product: {
          include: {
            category: true,
            stock: {
              select: {
                count: true,
                id: true,
              },
            },
          },
        },
      },
    },
  },
};
