import { IHealth } from "../../interface/graphql.interface";

export const rootQuery = `#graphql 
        type Query {
            health:Health            
        }
         type Health implements IHealth{
            service:String
            status:Boolean
            db:Boolean
        }
`;
