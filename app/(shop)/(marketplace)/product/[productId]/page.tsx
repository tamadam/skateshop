interface ProductPageProps {
  params: { productId: string };
}

const ProductPage = ({ params }: ProductPageProps) => {
  return <div>ProductPage: {params.productId}</div>;
};

export default ProductPage;
