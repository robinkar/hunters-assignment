import { AuthChecker } from 'type-graphql';
import { AuthContext } from '../interfaces/auth-context'
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Hero } from '../entities/hero';


export const authChecker: AuthChecker<AuthContext> = async (
    { root, args, context, info },
    roles,
) => {
    // Authorization token from request
    const token = context.token;

    try {
        // Get userId from the auth token;
        const { userId } = jwt.verify(token, process.env.JWT_SIGNING_SECRET) as { userId: string };

        // Find a hero with matching userId
        const heroRepository = getRepository(Hero);
        const hero = await heroRepository.findOne(userId);

        if (hero === undefined) {
            return false;
        }

        // Allow access if hero has relevant role
        return roles.length === 0 || roles.includes(hero.role);
    } catch (error) {
        // Invalid token
        return false;
    }
}