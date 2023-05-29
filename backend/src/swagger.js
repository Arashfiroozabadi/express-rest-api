module.exports = {
    'openapi': '3.0.3',
    'info': {
        'version': '1.0.0',
        'title': 'namnak CRUD rest api document',
        'description': 'A minimal and easy to follow example of what you need to create a CRUD style API',
        'license': {
            'name': 'MIT',
            'url': 'https://opensource.org/licenses/MIT'
        }
    },
    'tags': [
        {
            'name': 'Users',
            'description': 'CRUD API for Users'
        },
        {
            'name': 'Posts',
            'description': 'CRUD API for Posts'
        },
        {
            'name': 'Categories',
            'description': 'CRUD API for Categories'
        },
        {
            'name': 'Tags',
            'description': 'CRUD API for Tags'
        },
    ],
    'paths': {
        '/api/users': {
            // 'get': {
            //     'tags': [
            //         'Users'
            //     ],
            //     'summary': 'Get all users',
            //     'description': 'Retrieve all Users from the database',
            //     'responses': {
            //         '200': {
            //             'description': 'A list of Users',
            //             'content': {
            //                 'application/json': {
            //                     'schema': {
            //                         '$ref': '#/components/schemas/User'
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // },
            'post': {
                'tags': ['Users'],
                'summary': 'create new user',
                'description': 'create new user in database',
                'requestBody': {
                    '$ref': '#/components/requestBodies/User'
                },
                'responses': {
                    '201': {
                        '$ref': '#/components/responses/userResponse'
                    },
                    '400': {
                        '$ref': '#/components/responses/invalidDataForCreateNewUser'
                    },
                    '500': {
                        '$ref': '#/components/responses/500'
                    }
                }
            }
        },
        '/api/users/me': {
            'get': {
                'tags': ['Users'],
                'summary': 'Get user data',
                'description': 'get authorized user data',
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'responses': {
                    '200': {
                        '$ref': '#/components/responses/userResponse'
                    },
                    '401': {
                        '$ref': '#/components/responses/unauthorized'
                    },
                    '500': {
                        '$ref': '#/components/responses/500'
                    }
                }
            }
        },
        '/api/users/login': {
            'post': {
                'tags': ['Users'],
                'summary': 'login user',
                'description': 'login user by phone number and password',
                'requestBody': {
                    '$ref': '#/components/requestBodies/LoginUser'
                },
                'responses': {
                    201: {
                        '$ref': '#/components/responses/userResponse'
                    },
                    400: {
                        '$ref': '#/components/responses/invalidDataForLoginUser'
                    },
                    401: {
                        'description': 'password is not correct',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'properties': {
                                        'msg': {
                                            'type': 'string',
                                            'example': 'password is not correct'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    404: {
                        '$ref': '#/components/responses/userNotFound'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            }
        },
        '/api/users/logout': {
            'post': {
                'tags': ['Users'],
                'summary': 'logout user',
                'description': 'logout user by remove user token',
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'responses': {
                    201: {
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'properties': {
                                        'msg': {
                                            'type': 'string',
                                            'example': 'The user account has been logged out'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        '$ref': '#/components/responses/unauthorized'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            }
        },
        '/api/posts': {
            'get': {
                'tags': [
                    'Posts'
                ],
                'summary': 'Get all posts',
                'description': 'Retrieve all Posts from the database',
                'responses': {
                    '200': {
                        'description': 'A list of Posts',
                        'content': {
                            'application/json': {
                                'schema': {
                                    type: 'array',
                                    items: {
                                        '$ref': '#/components/schemas/Post'
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        '$ref': '#/components/responses/500'
                    }
                }
            },
            'post': {
                'tags': [
                    'Posts'
                ],
                'summary': 'create new Post',
                'description': 'create new post by user and save in database',
                'operationId': 'NewPost',
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'requestBody': {
                    '$ref': '#/components/requestBodies/newPost'
                },
                'responses': {
                    201: {
                        'description': 'post ID',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'properties': {
                                        '_id': {
                                            'type': 'string',
                                            'example': '6467fca11dba2e8cac1130ed'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        '$ref': '#/components/responses/invalidDataForCreateNewPost'
                    },
                    401: {
                        '$ref': '#/components/responses/unauthorized'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            }
        },
        '/api/posts/{_id}': {
            'get': {
                tags: ['Posts'],
                'summary': 'Find post by ID',
                'description': 'Returns a single Post',
                'operationId': 'getPostById',
                'parameters': [
                    {
                        'name': '_id',
                        'in': 'path',
                        'description': 'ID of Post to return',
                        'required': true,
                        'schema': {
                            'type': 'string',
                            'pattern': '^[a-zA-Z0-9]{24}$',
                            'format': 'bson-objectid'
                        }
                    }
                ],
                'responses': {
                    200: {
                        '$ref': '#/components/responses/getPostByIdResponse'
                    },
                    400: {
                        '$ref': '#/components/responses/requiredID'
                    },
                    404: {
                        '$ref': '#/components/responses/notFound'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            },
            'put': {
                tags: ['Posts'],
                'summary': 'update post by ID',
                'operationId': 'updatePostById',
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'parameters': [
                    {
                        'name': '_id',
                        'in': 'path',
                        'description': 'ID of Post',
                        'required': true,
                        'schema': {
                            'type': 'string',
                            'pattern': '^[a-zA-Z0-9]{24}$',
                            'format': 'bson-objectid'
                        }
                    }
                ],
                'requestBody': {
                    '$ref': '#/components/requestBodies/updatePost'
                },
                'responses': {
                    200: {
                        '$ref': '#/components/responses/ok'
                    },
                    400: {
                        '$ref': '#/components/responses/invalidDataForUpdatePost'
                    },
                    401: {
                        '$ref': '#/components/responses/unauthorized'
                    },
                    403: {
                        '$ref': '#/components/responses/accessDenied'
                    },
                    404: {
                        '$ref': '#/components/responses/notFound'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            },
            'delete': {
                tags: ['Posts'],
                'summary': 'delete post by ID',
                'operationId': 'deletePostById',
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'parameters': [
                    {
                        'name': '_id',
                        'in': 'path',
                        'description': 'ID of Post',
                        'required': true,
                        'schema': {
                            'type': 'string',
                            'pattern': '^[a-zA-Z0-9]{24}$',
                            'format': 'bson-objectid'
                        }
                    }
                ],
                'responses': {
                    201: {
                        '$ref': '#/components/responses/ok'
                    },
                    400: {
                        '$ref': '#/components/responses/requiredID'
                    },
                    401: {
                        '$ref': '#/components/responses/unauthorized'
                    },
                    403: {
                        '$ref': '#/components/responses/accessDenied'
                    },
                    404: {
                        '$ref': '#/components/responses/notFound'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            }
        },
        '/api/categories': {
            get: {
                'tags': [
                    'Categories'
                ],
                'summary': 'Get all categories',
                'responses': {
                    '200': {
                        'description': 'list of categories',
                        'content': {
                            'application/json': {
                                'schema': {
                                    type: 'array',
                                    items: {
                                        '$ref': '#/components/schemas/Category'
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        '$ref': '#/components/responses/500'
                    }
                }
            },
            post: {
                'tags': [
                    'Categories'
                ],
                'summary': 'create new Category',
                'description': 'create new post by user and save in database',
                'operationId': 'NewCategory',
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'requestBody': {
                    '$ref': '#/components/requestBodies/newCategory'
                },
                'responses': {
                    201: {
                        'description': 'category ID',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'properties': {
                                        '_id': {
                                            'type': 'string',
                                            'example': '6467fca11dba2e8cac1130ed'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        '$ref': '#/components/responses/invalidDataForCreateNewCategory'
                    },
                    401: {
                        '$ref': '#/components/responses/unauthorized'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            }
        },
        '/api/categories/{_id}': {
            'get': {
                tags: ['Category'],
                'summary': 'get category by ID',
                'parameters': [
                    {
                        'name': '_id',
                        'in': 'path',
                        'description': 'category _id',
                        'required': true,
                        'schema': {
                            'type': 'string',
                            'pattern': '^[a-zA-Z0-9]{24}$',
                            'format': 'bson-objectid'
                        }
                    }
                ],
                'responses': {
                    200: {
                        '$ref': '#/components/responses/getCategoryByIdResponse'
                    },
                    400: {
                        '$ref': '#/components/responses/requiredID'
                    },
                    404: {
                        '$ref': '#/components/responses/notFound'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            },
            'put': {
                tags: ['Category'],
                'summary': 'update category by ID',
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'parameters': [
                    {
                        'name': '_id',
                        'in': 'path',
                        'description': 'category _id',
                        'required': true,
                        'schema': {
                            'type': 'string',
                            'pattern': '^[a-zA-Z0-9]{24}$',
                            'format': 'bson-objectid'
                        }
                    }
                ],
                'requestBody': {
                    '$ref': '#/components/requestBodies/updateCategory'
                },
                'responses': {
                    200: {
                        '$ref': '#/components/responses/ok'
                    },
                    400: {
                        '$ref': '#/components/responses/invalidDataForUpdatePost'
                    },
                    401: {
                        '$ref': '#/components/responses/unauthorized'
                    },
                    403: {
                        '$ref': '#/components/responses/accessDenied'
                    },
                    404: {
                        '$ref': '#/components/responses/notFound'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            },
            'delete': {
                tags: ['Categories'],
                'summary': 'delete category by ID',
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'parameters': [
                    {
                        'name': '_id',
                        'in': 'path',
                        'description': '_id of category',
                        'required': true,
                        'schema': {
                            'type': 'string',
                            'pattern': '^[a-zA-Z0-9]{24}$',
                            'format': 'bson-objectid'
                        }
                    }
                ],
                'responses': {
                    201: {
                        '$ref': '#/components/responses/ok'
                    },
                    400: {
                        '$ref': '#/components/responses/requiredID'
                    },
                    401: {
                        '$ref': '#/components/responses/unauthorized'
                    },
                    403: {
                        '$ref': '#/components/responses/accessDenied'
                    },
                    404: {
                        '$ref': '#/components/responses/notFound'
                    },
                    500: {
                        '$ref': '#/components/responses/500'
                    }
                }
            }
        }
    },
    'components': {
        'schemas': {
            User: {
                'required': [
                    'name',
                    'email',
                    'phone',
                    'password'
                ],
                'type': 'object',
                'properties': {
                    '_id': {
                        'type': 'string',
                        'description': 'objectId created by mongodb',
                        'example': '6467fca11dba2e8cac1130ed'
                    },
                    'name': {
                        'type': 'string',
                        'example': 'arash firozabadi'
                    },
                    'email': {
                        'type': 'string',
                        'example': 'arashfiroozabadii@gmail.com'
                    },
                    'phone': {
                        'type': 'string',
                        'example': '09364936692'
                    },
                    'password': {
                        'type': 'string',
                        'example': 'password'
                    },
                    'token': {
                        'type': 'string',
                        'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcwYzE3MjdjMGVkZTBmMTc0YTQ2ZjAiLCJpYXQiOjE2ODUxMTExNTR9.1DahTUuX0MUZAy3RinQThSEfN45BV_hvo9cN5uqDdGw'
                    },
                    'updateAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    },
                    'createdAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    }
                }
            },
            Post: {
                'required': [
                    'title',
                    'description',
                    'abstract',
                    'author'
                ],
                'type': 'object',
                'properties': {
                    '_id': {
                        'type': 'string',
                        'description': 'objectId created by mongodb',
                        'example': '6467fca11dba2e8cac1130ed'
                    },
                    'title': {
                        'type': 'string',
                        'example': 'the best post'
                    },
                    'description': {
                        'type': 'string',
                        'example': 'the best post description you can write'
                    },
                    'abstract': {
                        'type': 'string',
                        'example': 'the best abstract'
                    },
                    'author': {
                        'type': 'string',
                        'example': '6467fca11dba2e8cac1130ed'
                    },
                    'readingTime': {
                        'type': 'number',
                        'example': 10
                    },
                    'like': {
                        'type': 'number',
                        'example': 10
                    },
                    'dislike': {
                        'type': 'number',
                        'example': 3
                    },
                    'photo': {
                        'type': 'string',
                        'example': 'http://someimageurl.png'
                    },
                    'status': {
                        'type': 'string',
                        'example': 'DRAFT',
                        'enum': ['DRAFT', 'PUBLISH', 'ARCHIVE']
                    },
                    'publishAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    },
                    'updateAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    },
                    'createdAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    },
                    'categories': {
                        'type': 'array',
                        'items': {
                            '$ref': '#/components/schemas/Category'
                        }
                    },
                    'comments': {
                        'type': 'array',
                        'items': {
                            '$ref': '#/components/schemas/Comment'
                        }
                    },
                    'tags': {
                        'type': 'array',
                        'items': {
                            '$ref': '#/components/schemas/Tag'
                        }
                    }
                }
            },
            Category: {
                'required': [
                    'title'
                ],
                'type': 'object',
                'properties': {
                    '_id': {
                        'type': 'string',
                        'description': 'objectId created by mongodb',
                        'example': '6467fca11dba2e8cac1130ed'
                    },
                    'title': {
                        'type': 'string',
                        'example': 'star'
                    },
                    'subCategories': {
                        'type': 'array',
                        'items': {
                            '$ref': '#/components/schemas/Category'
                        }
                    },
                    'updateAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    },
                    'createdAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    }
                }
            },
            Tag: {
                'required': [
                    'title'
                ],
                'type': 'object',
                'properties': {
                    '_id': {
                        'type': 'string',
                        'description': 'objectId created by mongodb',
                        'example': '6467fca11dba2e8cac1130ed'
                    },
                    'title': {
                        'type': 'string',
                        'example': 'dark'
                    },
                    'updateAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    },
                    'createdAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    }
                }
            },
            Comment: {
                'required': [
                    'msg',
                    'author'
                ],
                'type': 'object',
                'properties': {
                    '_id': {
                        'type': 'string',
                        'description': 'objectId created by mongodb',
                        'example': '6467fca11dba2e8cac1130ed'
                    },
                    author: {
                        'type': 'string',
                        'example': '6467fca11dba2e8cac1130ed'
                    },
                    msg: {
                        'type': 'string',
                        'example': 'banana'
                    },
                    like: {
                        type: 'number',
                        example: 10
                    },
                    dislike: {
                        type: 'number',
                        example: 2
                    },

                    'updateAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    },
                    'createdAt': {
                        'type': 'Date',
                        'example': '2022-02-20T07:32:39.656+00:00'
                    }
                }
            }
        },
        'requestBodies': {
            updatePost: {
                'required': true,
                'description': 'object data for update post',
                'content': {
                    'application/json': {
                        'schema': {
                            'required': [
                                'title',
                                'description',
                                'abstract'
                            ],
                            'type': 'object',
                            'properties': {
                                'title': {
                                    'type': 'string',
                                    'example': 'change title'
                                },
                                'description': {
                                    'type': 'string',
                                    'example': 'the best post description you can change'
                                },
                                'abstract': {
                                    'type': 'string',
                                    'example': 'the best abstract'
                                },
                                'readingTime': {
                                    'type': 'number',
                                    'example': 10
                                },
                                'photo': {
                                    'type': 'string',
                                    'example': 'http://someimageurl.png'
                                },
                                'status': {
                                    'type': 'string',
                                    'enum': ['DRAFT', 'PUBLISH', 'ARCHIVE'],
                                    'example': 'PUBLISH'
                                },
                                'categories': {
                                    'type': 'array',
                                    'items': {
                                        'oneOf': [
                                            { example: '6467fca11dba2e8cac1130ed' },
                                            { example: '6467fca11dba2e8cac113023' }
                                        ]
                                    }
                                },
                                'tags': {
                                    'items': {
                                        'oneOf': [
                                            { example: '6467fca11dba2e8cac1130ed' },
                                            { example: '6467fca11dba2e8cac113023' }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    'application/x-www-form-urlencoded': {
                        'schema': {
                            '$ref': '#/components/schemas/Post'
                        }
                    }
                }
            },
            newPost: {
                'required': true,
                'description': 'Post object for store in database',
                'content': {
                    'application/json': {
                        'schema': {
                            'required': [
                                'title',
                                'description',
                                'abstract'
                            ],
                            'type': 'object',
                            'properties': {
                                'title': {
                                    'type': 'string',
                                    'example': 'the best post'
                                },
                                'description': {
                                    'type': 'string',
                                    'example': 'the best post description you can write'
                                },
                                'abstract': {
                                    'type': 'string',
                                    'example': 'the best abstract'
                                },
                                'readingTime': {
                                    'type': 'number',
                                    'example': 10
                                },
                                'photo': {
                                    'type': 'string',
                                    'example': 'http://someimageurl.png'
                                },
                                'status': {
                                    'type': 'string',
                                    'enum': ['DRAFT', 'PUBLISH', 'ARCHIVE'],
                                    'example': 'DRAFT'
                                },
                                'categories': {
                                    'type': 'array',
                                    'items': {
                                        'oneOf': [
                                            { example: '6467fca11dba2e8cac1130ed' },
                                            { example: '6467fca11dba2e8cac113023' }
                                        ]
                                    }
                                },
                                'tags': {
                                    'items': {
                                        'oneOf': [
                                            { example: '6467fca11dba2e8cac1130ed' },
                                            { example: '6467fca11dba2e8cac113023' }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    'application/x-www-form-urlencoded': {
                        'schema': {
                            '$ref': '#/components/schemas/Post'
                        }
                    }
                }
            },
            LoginUser: {
                'required': true,
                'description': 'User object that needs to login user',
                'content': {
                    'application/json': {
                        'schema': {
                            'required': [
                                'phone',
                                'password'
                            ],
                            'type': 'object',
                            'properties': {
                                'phone': {
                                    'type': 'string',
                                    'example': '09364936692'
                                },
                                'password': {
                                    'type': 'string',
                                    'example': 'password'
                                }
                            }

                        }
                    }
                }
            },
            User: {
                'required': true,
                'description': 'User object that needs to be added to the database',
                'content': {
                    'application/json': {
                        'schema': {
                            'required': [
                                'name',
                                'email',
                                'phone',
                                'password'
                            ],
                            'type': 'object',
                            'properties': {
                                'name': {
                                    'type': 'string',
                                    'example': 'arash firozabadi'
                                },
                                'email': {
                                    'type': 'string',
                                    'example': 'arashfiroozabadii@gmail.com'
                                },
                                'phone': {
                                    'type': 'string',
                                    'example': '09364936692'
                                },
                                'password': {
                                    'type': 'string',
                                    'example': 'password'
                                }
                            }

                        }
                    },
                    'application/x-www-form-urlencoded': {
                        'schema': {
                            '$ref': '#/components/schemas/User'
                        }
                    }
                }
            },
            Post: {
                'description': 'Post object that needs to be added to the database',
                'content': {
                    'application/json': {
                        'schema': {
                            '$ref': '#/components/schemas/Post'
                        }
                    }
                }
            },
            newCategory: {
                'required': true,
                'description': 'object date for create new category',
                'content': {
                    'application/json': {
                        'schema': {
                            'required': [
                                'title'
                            ],
                            'type': 'object',
                            'properties': {
                                'title': {
                                    'type': 'string',
                                    'example': 'sun'
                                }
                            }
                        }
                    },
                    'application/x-www-form-urlencoded': {
                        'schema': {
                            '$ref': '#/components/schemas/Category'
                        }
                    }
                }
            }
        },
        'responses': {
            ok: {
                'description': 'success request',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                'msg': {
                                    'type': 'string',
                                    'example': 'ok'
                                }
                            }
                        }
                    }
                }
            },
            getCategoryByIdResponse: {
                'description': 'response of get category by id',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                '_id': {
                                    'type': 'string',
                                    'description': 'objectId created by mongodb',
                                    'example': '6467fca11dba2e8cac1130ed'
                                },
                                'title': {
                                    'type': 'string',
                                    'example': 'the best post'
                                },
                                'createdAt': {
                                    'type': 'Date',
                                    'example': '2022-02-20T07:32:39.656+00:00'
                                },
                                'updateAt': {
                                    'type': 'Date',
                                    'example': '2022-02-20T07:32:39.656+00:00'
                                }
                            }
                        }
                    }
                }
            },
            getPostByIdResponse: {
                'description': 'response of get post by id',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                '_id': {
                                    'type': 'string',
                                    'description': 'objectId created by mongodb',
                                    'example': '6467fca11dba2e8cac1130ed'
                                },
                                'title': {
                                    'type': 'string',
                                    'example': 'the best post'
                                },
                                'description': {
                                    'type': 'string',
                                    'example': 'the best post description you can write'
                                },
                                'abstract': {
                                    'type': 'string',
                                    'example': 'the best abstract'
                                },
                                'author': {
                                    'type': 'string',
                                    'example': '6467fca11dba2e8cac1130ed'
                                },
                                'readingTime': {
                                    'type': 'number',
                                    'example': 10
                                },
                                'like': {
                                    'type': 'number',
                                    'example': 10
                                },
                                'dislike': {
                                    'type': 'number',
                                    'example': 3
                                },
                                'photo': {
                                    'type': 'string',
                                    'example': 'http://someimageurl.png'
                                },
                                'publishAt': {
                                    'type': 'Date',
                                    'example': '2022-02-20T07:32:39.656+00:00'
                                },
                                'updateAt': {
                                    'type': 'Date',
                                    'example': '2022-02-20T07:32:39.656+00:00'
                                },
                                'createdAt': {
                                    'type': 'Date',
                                    'example': '2022-02-20T07:32:39.656+00:00'
                                },
                                'categories': {
                                    'type': 'array',
                                    'items': {
                                        'oneOf': [
                                            { example: 'star' },
                                            { example: 'moon' }
                                        ]
                                    }
                                },
                                'comments': {
                                    'type': 'array',
                                    'items': {
                                        '$ref': '#/components/schemas/Comment'
                                    }
                                },
                                'tags': {
                                    'type': 'array',
                                    'items': {
                                        'oneOf': [
                                            { example: 'dark' },
                                            { example: 'lion' }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            userResponse: {
                'description': 'user response data',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                '_id': {
                                    'type': 'string',
                                    'example': '6467fca11dba2e8cac1130ed'
                                },
                                'name': {
                                    'type': 'string',
                                    'example': 'arash firozabadi'
                                },
                                'email': {
                                    'type': 'string',
                                    'example': 'arashfiroozabadii@gmail.com'
                                },
                                'phone': {
                                    'type': 'string',
                                    'example': '09364936692'
                                },
                                'token': {
                                    'type': 'string',
                                    'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcwYzE3MjdjMGVkZTBmMTc0YTQ2ZjAiLCJpYXQiOjE2ODUxMTExNTR9.1DahTUuX0MUZAy3RinQThSEfN45BV_hvo9cN5uqDdGw'
                                },
                                'updateAt': {
                                    'type': 'Date',
                                    'example': '2022-02-20T07:32:39.656+00:00'
                                },
                                'createdAt': {
                                    'type': 'Date',
                                    'example': '2022-02-20T07:32:39.656+00:00'
                                }
                            }
                        }
                    }
                }
            },
            unauthorized: {
                'description': 'unauthorized user',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                'msg': {
                                    'type': 'string',
                                    'example': 'user not authorized'
                                }
                            }
                        }
                    }
                }
            },
            accessDenied: {
                'description': 'access denied',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                'msg': {
                                    'type': 'string',
                                    'example': 'access denied'
                                }
                            }
                        }
                    }
                }
            },
            invalidDataForCreateNewUser: {
                'description': 'invalid user required data',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'array',
                            'items': {
                                'oneOf': [
                                    { example: 'name is required' },
                                    { example: 'password is required' },
                                    { example: 'phone number is required' },
                                    { example: 'phone number is not valid' },
                                    { example: 'email is required' },
                                    { example: 'email is invalid' },
                                    {
                                        example: {
                                            msg: 'value for this field is duplicated',
                                            field: 'email'
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            invalidDataForCreateNewPost: {
                'description': 'invalid post required data',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'array',
                            'items': {
                                'oneOf': [
                                    { example: 'title is required' },
                                    { example: 'description is required' },
                                    { example: 'abstract number is required' }
                                ]
                            }
                        }
                    }
                }
            },
            invalidDataForUpdatePost: {
                'description': 'invalid post required data',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'array',
                            'items': {
                                'oneOf': [
                                    { example: 'title is required' },
                                    { example: 'description is required' },
                                    { example: 'abstract number is required' },
                                    { example: 'id is required' }
                                ]
                            }
                        }
                    }
                }
            },
            invalidDataForLoginUser: {
                'description': 'invalid user required data',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'array',
                            'items': {
                                'oneOf': [
                                    { example: 'password is required' },
                                    { example: 'phone number is required' }
                                ]
                            }
                        }
                    }
                }
            },
            userNotFound: {
                'description': 'user not found on data base',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                'msg': {
                                    'type': 'string',
                                    'example': 'user not found'
                                }
                            }
                        }
                    }
                }
            },
            notFound: {
                'description': 'not found on data base',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                'msg': {
                                    'type': 'string',
                                    'example': 'not found'
                                }
                            }
                        }
                    }
                }
            },
            requiredID: {
                'description': 'id is required to find data by id on database',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                'msg': {
                                    'type': 'string',
                                    'example': 'id is required'
                                }
                            }
                        }
                    }
                }
            },
            500: {
                'description': 'Unexpected error',
                'content': {
                    'application/json': {
                        'schema': {
                            'type': 'object',
                            'properties': {
                                'msg': {
                                    'type': 'string',
                                    'example': 'can not connect to the database'
                                }
                            }
                        }
                    }
                }
            }
        },
        'securitySchemes': {
            'bearerAuth': {
                'type': 'http',
                'scheme': 'bearer',
                'bearerFormat': 'JWT'
            }
        }
    }
};