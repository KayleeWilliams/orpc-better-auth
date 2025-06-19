import {
	HydrationBoundary,
	type QueryClient,
	dehydrate,
} from '@tanstack/react-query';
import { type ReactNode, cache } from 'react';
import { createQueryClient } from './client';

export const getQueryClient = cache(createQueryClient);

export function HydrateClient(props: {
	children: ReactNode;
	client: QueryClient;
}) {
	return (
		<HydrationBoundary state={dehydrate(props.client)}>
			{props.children}
		</HydrationBoundary>
	);
}
