export const rootQuery = `#graphql 


  # ----------- Query ------------- #

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

        type User {
            name:String!
            email:String!
            password:String!
        }




        # ----------- Mutation ------------- #

        type Mutation {
            createUser(user:UserCreateInput!):User
        }

        
        # ----------- Input ------------- #
        
        input UserCreateInput {
            name:String
            email:String
            password:String
        }
`;
