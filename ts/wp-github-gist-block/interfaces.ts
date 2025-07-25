export interface CustomBlockAttributes {
	gistId: { type: "string"; default: string };
	rawContent: { type: "string"; default: string };
}

type CustomDerivedAttributes<T> = {
	[K in keyof T]: T[K] extends { default: infer U } ? U : never;
};

export type CustomBlockEditProps =
	CustomDerivedAttributes<CustomBlockAttributes>;
