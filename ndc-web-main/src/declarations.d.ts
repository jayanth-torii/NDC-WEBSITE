declare module "*.png" {
    const value: string;
    export default value;
}

declare namespace JSX {
  interface IntrinsicElements {
    "appli-integration": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      id?: string;
    };
  }
}
