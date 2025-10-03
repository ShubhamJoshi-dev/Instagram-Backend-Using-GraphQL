export const rootQuery = `#graphql 


  # ----------- Query ------------- #

        type Query {
            health:Health    
            user:UserProfileResponse    
            posts:[Post]
            post:Post    
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

        type UserProfile {
            userProfileName:String
            primaryEmail:String
            secondaryEmail:String
            phoneNumber:String
            isDeleted:Boolean
            isDeactivated:Boolean
        }

        type Token {
            accessToken:String!
            refreshToken:String!
        }

        type Post {
            title:String
            description:String
            tags:[String]
        }


        type CustomErrorResponse{
            message:String
            code:Int
        }


        type UserCreateResponse {
            user:User
            error:CustomErrorResponse

        }

        type UserLoginResponse {
            tokens:Token
            error:CustomErrorResponse
        }


        type UserProfileResponse {
            user:User
            userProfile:UserProfile
            error:CustomErrorResponse
        }

        type PostUserResponse{
            post:Post
            error:CustomErrorResponse
        }
        

        # ----------- Mutation ------------- #

        type Mutation {
            createUser(user:UserCreateInput!):UserCreateResponse
            loginUser(user:UserLoginInput!):UserLoginResponse
            postUser(post:PostInput!):PostUserResponse
        }

        
        # ----------- Input ------------- #
        
        input UserCreateInput {
            name:String
            email:String
            password:String
        }

        input UserLoginInput {
            name:String
            password:String
        }

        input PostInput {
            title:String
            description:String
            tags:[String]
        }
`;
