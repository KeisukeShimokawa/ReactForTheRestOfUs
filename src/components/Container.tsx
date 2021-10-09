type ContainerProps = {
  wide?: boolean;
  children: React.ReactNode;
};

const Container = ({ children, wide = false }: ContainerProps) => {
  return (
    <div className={"container py-md-5 " + (wide ? "" : "container-narrow")}>
      {children}
    </div>
  );
};

export { Container };
