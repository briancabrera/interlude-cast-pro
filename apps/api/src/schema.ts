import { gql } from 'graphql-tag';
import { Ctx } from './context';

export const typeDefs = gql`
  scalar DateTime
  type Tenant { id: ID!, key: String!, name: String! }
  type Venue { id: ID!, name: String!, slug: String! }
  type Event { id: ID!, title: String!, startsAt: DateTime!, endsAt: DateTime! }

  type Query {
    tenants: [Tenant!]!
    venues: [Venue!]!
    events(from: DateTime, to: DateTime): [Event!]!
  }
`;

export const resolvers = {
  Query: {
    tenants: (_: any, __: any, ctx: Ctx) =>
      ctx.prisma.tenant.findMany(),
    venues: (_: any, __: any, ctx: Ctx) =>
      ctx.prisma.venue.findMany(),
    events: (_: any, args: any, ctx: Ctx) =>
      ctx.prisma.event.findMany({
        where: {
          startsAt: args.from ? { gte: new Date(args.from) } : undefined,
          endsAt: args.to ? { lte: new Date(args.to) } : undefined
        },
        orderBy: { startsAt: 'asc' }
      })
  }
};
