import m2s from 'mongoose-to-swagger';
import User from './models/User.model.js';
import Post from './models/Post.model.js';

export const options = {
    openapi: "3.0.1",
    info: {
        version: "1.0.0",
        title: "MEAN Blog Project CF5 API",
        description: "Blog Project Application API",
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT"
        }
    },
    servers: [
        {
            url: "http://localhost:4000/",
            description: "Local server"
        },
        {
            url: "https://api_url_testing",
            description: "Testing server"
        }
    ],
    tags: [
        {
            name: "Users",
            description: "API for Users in the system"
        },
        {
            name: "Posts",
            description: "API for Posts in the system"
        },
    ],
    paths: {
        "/signup": {
            post: {
                tags: ["Users"],
                summary: "User Signup",
                description: "Register a new user",
                requestBody: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                username: { type: "string" },
                                password: { type: "string" },
                            },
                            required: ["username", "password"]
                        }
                    }
                },
                responses: {
                    200: {
                        description: "User registered successfully",
                    },
                    400: {
                        description: "Invalid input"
                    },
                    500: {
                        description: "Server error"
                    }
                }
            }
        },
        "/signin": {
            post: {
                tags: ["Users"],
                summary: "User Signin",
                description: "Authenticate and login a user",
                requestBody: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                username: { type: "string" },
                                password: { type: "string" },
                            },
                            required: ["username", "password"]
                        }
                    }
                },
                responses: {
                    200: {
                        description: "User authenticated successfully",
                    },
                    400: {
                        description: "Invalid credentials"
                    },
                    500: {
                        description: "Server error"
                    }
                }
            }
        },
        "/signout": {
            get: {
                tags: ["Users"],
                summary: "User Signout",
                description: "Signout the authenticated user",
                responses: {
                    200: {
                        description: "User signed out successfully",
                    },
                    500: {
                        description: "Server error"
                    }
                }
            }
        },
        "/check" : {
            get: {
                tags: ["Users"],
                summary: "Check Authenticated Route",
                description: "Check if the user is authenticated",
                security: [{
                    "bearerAuth" : []
                }],
                responses: {
                    200: {
                        description: "User is authenticated"
                    },
                    401: {
                        description: "Unauthorized"
                    },
                    500: {
                        description: "Server error"
                    }
                }
            }
        },
        "/": {
            get: {
                tags: ["Posts"],
                summary: "Get all posts in system",
                responses: {
                    200: {
                        description: "OK",
                        schema: {
                            $ref: "#/components/schemas/Post"
                        }
                    }
                }
            }
        },
        "/{id}": {
            get: {
                tags: ["Posts"],
                summary: "Get single post in system",
                responses: {
                    200: {
                        description: "OK",
                        schema: {
                            $ref: "#/components/schemas/Post"
                        }
                    }
                }
            }
        },
        "/create": {
            post: {
                tags: ["Posts"],
                summary: "Create a new post",
                description: "Create new post",
                requestBody: {
                    description: "Post schema to insert",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    content: { type: "string" },
                                    cover: { type: "string" },
                                    author: {
                                        type: "string",
                                        //format: "uuid"
                                    }
                                },
                                required: ["title", "content"]
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "New post inserted"
                    }
                }
            }
        },
        "/update/{id}": {
            patch: {
               tags: ["Posts"],
                summary: "Update a post",
                description: "Updates an existing post identified by its ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID of the post to update",
                        schema: {
                            type: "string",
                            //format: "uuid"
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Post"
                            },
                            example: {
                                title: "Updated Post Title",
                                content: "This is the updated content of the post.",
                                cover: "https://example.com/updated-cover.jpg",
                                author: "60d0fe4f5311236168a109ca"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Post updated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Post"
                                },
                                example: {
                                    title: "Updated Post Title",
                                    content: "This is the updated content of the post.",
                                    cover: "https://example.com/updated-cover.jpg",
                                    author: "60d0fe4f5311236168a109ca"
                                }
                            }
                        }
                    },
                    400: {
                        description: "Invalid ID supplied"
                    },
                    404: {
                        description: "Post not found"
                    },
                    500: {
                        description: "Internal server error"
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ]
            }
        },
        "/delete/{id}": {
            delete: {
                tags: ["Posts"],
                summary: "Delete a post",
                description: "Deletes an existing post identified by its ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID of the post to delete",
                        schema: {
                            type: "string",
                            //format: "uuid"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Post deleted successfully",
                        content: {
                            "application/json": {
                                example: {
                                    message: "Post deleted successfully"
                                }
                            }
                        }
                    },
                    400: {
                        description: "Invalid ID supplied"
                    },
                    404: {
                        description: "Post not found"
                    },
                    500: {
                        description: "Internal server error"
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ]
            }
        }
    },
    components: {
        schemas: {
            User: m2s(User),
            Post: m2s(Post)
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
};