import { StandardRPCJsonSerializer } from '@orpc/client/standard';
import {
	QueryClient,
	defaultShouldDehydrateQuery,
} from '@tanstack/react-query';

export const serializer = new StandardRPCJsonSerializer();

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000, // > 0 to prevent immediate refetching on mount
			},
			dehydrate: {
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === 'pending',
				serializeData(data) {
					const [json, meta] = serializer.serialize(data);
					return { json, meta };
				},
			},
			hydrate: {
				deserializeData(data) {
					return serializer.deserialize(data.json, data.meta);
				},
			},
		},
	});
}
