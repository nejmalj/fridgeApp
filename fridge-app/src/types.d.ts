declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

export type Product = {
  name: string;
  brand: string;
  image: string | null;
  quantity: number;
};
