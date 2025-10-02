export const rootQuery = `#graphql 
        type Query {
            health:Health            
        }
         type Health{
            service:String
            usage:Usage
            mongo:Boolean
        }

        type Usage {
            user:Int
            system:Int
        }
`;
