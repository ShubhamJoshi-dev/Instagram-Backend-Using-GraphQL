export const rootQuery = `#graphql 
        type Query {
            health:Health            
        }
         type Health{
            service:String
            status:Boolean
            db:Boolean
        }
`;
