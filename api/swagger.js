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
            description: "API for users in the system"
        },
        {
            name: "Posts",
            description: "API for Posts in the system"
        },
        {
            name: "Users and Posts",
            description: "API for users in the system and their posts"
        }
    ],
    paths: {
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