export interface CustomBlockAttributes {
	gistUrl: { type: "string"; default: string };
}

type CustomDerivedAttributes<T> = {
	[K in keyof T]: T[K] extends { default: infer U } ? U : never;
};

export type CustomBlockEditProps =
	CustomDerivedAttributes<CustomBlockAttributes>;
