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
            'name': 'Posts',
            'description': 'CRUD API for Posts'
        },
        {
            'name': 'Users',
            'description': 'CRUD API for Users'
        }
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
                        '$ref': '#/components/responses/Unauthorized'
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
                                    '$ref': '#/components/schemas/Post'
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
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/Post'
                            }
                        }
                    }
                },
                'responses': {
                    '200': {
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
                    '400': {
                        'description': 'invalid request body value',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'properties': {
                                        'msg': {
                                            'type': 'string',
                                            'example': 'title is required'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        '$ref': '#/components/responses/500'
                    }
                }
            }
        }
    },
    'components': {
        'schemas': {
            'User': {
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
            'Post': {
                'required': [
                    'title',
                    'description',
                    'abstract',
                    'author'
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
                    'author': {
                        'type': 'string',
                        'example': '6467fca11dba2e8cac1130ed'
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
            }
        },
        'requestBodies': {
            'LoginUser': {
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
            'User': {
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
                    }
                }
            },
            'Post': {
                'description': 'Post object that needs to be added to the database',
                'content': {
                    'application/json': {
                        'schema': {
                            '$ref': '#/components/schemas/Post'
                        }
                    }
                }
            }
        },
        'responses': {
            'userResponse': {
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
            'Unauthorized': {
                'description': 'Unauthorized user',
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
            'invalidDataForCreateNewUser': {
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
            'invalidDataForLoginUser': {
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
            'userNotFound': {
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
            '500': {
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