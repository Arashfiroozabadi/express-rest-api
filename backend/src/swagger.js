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
        }
    ],
    'paths': {
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
                                    '$ref': '#/definitions/Posts'
                                }
                            }
                        }
                    }
                }
            },
            'post': {
                'tags': [
                    'Post'
                ],
                'summary': 'create new Post',
                'description': 'create new post by user and save in database',
                'operationId': 'addPost',
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
                    }
                }
            }
        },
        '/api/posts/{id}': {
            'parameters': [
                {
                    'name': 'id',
                    'in': 'path',
                    'required': true,
                    'description': 'ID of the post that we want to match',
                    'type': 'string'
                }
            ],
            'get': {
                'tags': [
                    'Posts'
                ],
                'summary': 'Get post with given ID',
                'parameters': [
                    {
                        'in': 'path',
                        'name': 'id',
                        'required': true,
                        'description': 'Post with id',
                        'schema': {
                            '$ref': '#/definitions/id'
                        }
                    }
                ],
                'responses': {
                    '200': {
                        'description': 'OK',
                        'schema': {
                            '$ref': '#/definitions/Post'
                        }
                    },
                    '404': {
                        'description': 'Failed. Post not found.'
                    }
                }
            },
            'put': {
                'summary': 'Update post with given ID',
                'tags': [
                    'Posts'
                ],
                'requestBody': {
                    'description': 'Post Object',
                    'required': true,
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/definitions/Post'
                            }
                        }
                    }
                },
                'parameters': [
                    {
                        'in': 'path',
                        'name': 'id',
                        'required': true,
                        'description': 'Post with new values of properties',
                        'schema': {
                            '$ref': '#/definitions/id'
                        }
                    }
                ],
                'responses': {
                    '200': {
                        'description': 'OK',
                        'schema': {
                            '$ref': '#/definitions/Post'
                        }
                    },
                    '400': {
                        'description': 'Failed. Bad post data.'
                    },
                    '404': {
                        'description': 'Failed. Post not found.'
                    }
                }
            },
            'delete': {
                'summary': 'Delete Post with given ID',
                'tags': [
                    'Cats'
                ],
                'parameters': [
                    {
                        'in': 'path',
                        'name': 'id',
                        'required': true,
                        'description': 'Delete Post with id',
                        'schema': {
                            '$ref': '#/definitions/id'
                        }
                    }
                ],
                'responses': {
                    '200': {
                        'description': 'OK',
                        'schema': {
                            '$ref': '#/definitions/id'
                        }
                    },
                    '404': {
                        'description': 'Failed. Post not found.'
                    }
                }
            }
        }
    },
    'components': {
        'schemas': {
            'Post': {
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
                    'author': {
                        'type': 'string',
                        'example': '6467fca11dba2e8cac1130ed'
                    }
                },
                'required': [
                    'title',
                    'description',
                    'abstract',
                    'author'
                ]
            }
        }
    },
    'definitions': {
        'id': {
            'properties': {
                'ObjectId': {
                    'type': 'string'
                }
            }
        },
        'Post': {
            'type': 'object',
            'properties': {
                'genus': {
                    'type': 'string'
                },
                'name': {
                    'type': 'string'
                },
                'isHungry': {
                    'type': 'boolean'
                },
                'lastFedDate': {
                    'type': 'string'
                }
            }
        },
        'Posts': {
            'type': 'object',
            'properties': {
                'cats': {
                    'type': 'object',
                    'additionalProperties': {
                        '$ref': '#/definitions/Post'
                    }
                }
            }
        }
    }
};