// import { CloudServiceConfig } from "@/types/eep-dashboard";


// export const cloudServices: CloudServiceConfig = {
//   AWS: {
//     databases: [
//       {
//         name: 'Amazon RDS',
//         description: 'Managed Relational Database Service',
//         features: [
//           'Automated patching and backups',
//           'Multi-AZ deployment',
//           'Read replicas for improved performance',
//           'Six database engines to choose from'
//         ]
//       },
//       {
//         name: 'Amazon DynamoDB',
//         description: 'Fully managed NoSQL database',
//         features: [
//           'Single-digit millisecond performance',
//           'Built-in security and encryption',
//           'Automatic scaling',
//           'Global tables for multi-region deployment'
//         ]
//       },
//       {
//         name: 'Amazon Aurora',
//         description: 'MySQL and PostgreSQL-compatible database',
//         features: [
//           '5x performance of MySQL',
//           'Distributed storage with auto-scaling',
//           'Continuous backup to S3',
//           'Serverless option available'
//         ]
//       }
//     ],
//     backend: [
//       {
//         name: 'AWS Lambda',
//         description: 'Serverless compute service',
//         features: [
//           'Pay-per-use pricing',
//           'Automatic scaling',
//           'Supports multiple programming languages',
//           'Integrated security model'
//         ]
//       },
//       {
//         name: 'Amazon SageMaker',
//         description: 'Machine Learning platform',
//         features: [
//           'Built-in algorithms',
//           'Automated model tuning',
//           'Integrated development environment',
//           'One-click deployment'
//         ]
//       },
//       {
//         name: 'AWS IoT Greengrass',
//         description: 'Edge computing service',
//         features: [
//           'Local compute capabilities',
//           'Machine learning at edge',
//           'Device security management',
//           'Local messaging'
//         ]
//       }
//     ],
//     frontend: [
//       {
//         name: 'AWS CodeCatalyst',
//         description: 'Unified software development service',
//         features: [
//           'Automated CI/CD pipelines',
//           'Development environments',
//           'Issue tracking',
//           'Team collaboration tools'
//         ]
//       },
//       {
//         name: 'API Gateway + Lambda',
//         description: 'Serverless API solution',
//         features: [
//           'RESTful and WebSocket APIs',
//           'Request/response transformation',
//           'API versioning',
//           'Usage plans and API keys'
//         ]
//       },
//       {
//         name: 'AWS Amplify',
//         description: 'Full-stack development platform',
//         features: [
//           'Authentication and authorization',
//           'GraphQL API support',
//           'Continuous deployment',
//           'Hosting and content delivery'
//         ]
//       }
//     ]
//   },
//   Azure: {
//     databases: [
//       {
//         name: 'Azure SQL Database',
//         description: 'Managed SQL Server database',
//         features: [
//           'Built-in intelligence',
//           'Automatic tuning',
//           'Advanced security',
//           'Scalable performance'
//         ]
//       }
//     ],
//     backend: [
//       {
//         name: 'Azure Functions',
//         description: 'Event-driven serverless compute',
//         features: [
//           'Serverless architecture',
//           'Multiple language support',
//           'Integrated security',
//           'Pay-per-execution pricing'
//         ]
//       }
//     ],
//     frontend: [
//       {
//         name: 'Azure Static Web Apps',
//         description: 'Modern web app service',
//         features: [
//           'Built-in CI/CD',
//           'Serverless API support',
//           'Global distribution',
//           'Free SSL certificates'
//         ]
//       }
//     ]
//   },
//   GCP: {
//     databases: [
//       {
//         name: 'Cloud SQL',
//         description: 'Managed MySQL, PostgreSQL, and SQL Server',
//         features: [
//           'Automated backups',
//           'High availability configuration',
//           'Integrated security',
//           'Automatic storage increases'
//         ]
//       }
//     ],
//     backend: [
//       {
//         name: 'Cloud Functions',
//         description: 'Event-driven serverless platform',
//         features: [
//           'Automatic scaling',
//           'Pay-only-for-use',
//           'Connected to Google Cloud events',
//           'Multiple runtime environments'
//         ]
//       }
//     ],
//     frontend: [
//       {
//         name: 'App Engine',
//         description: 'Fully managed platform',
//         features: [
//           'Built-in auto scaling',
//           'Load balancing',
//           'Version management',
//           'Traffic splitting'
//         ]
//       }
//     ]
//   }
// };


// config/eep-cloudServices.ts
import { CloudServiceConfig } from '@/types/eep-dashboard';

export const cloudServices: CloudServiceConfig = {
  AWS: {
    databases: [
      {
        name: 'Amazon RDS',
        description: 'Managed Relational Database Service with multiple engine options',
        features: [
          'Automated patching and backups',
          'Multi-AZ deployment',
          'Read replicas for improved performance',
          'Six database engines to choose from',
          'Point-in-time recovery'
        ]
      },
      {
        name: 'Amazon DynamoDB',
        description: 'Fully managed NoSQL database service for any scale',
        features: [
          'Single-digit millisecond performance',
          'Built-in security and encryption',
          'Automatic scaling',
          'Global tables for multi-region deployment',
          'Backup and restore capabilities'
        ]
      },
      {
        name: 'Amazon Aurora',
        description: 'MySQL and PostgreSQL-compatible relational database',
        features: [
          'Up to 5x the throughput of standard MySQL',
          'Up to 3x the throughput of standard PostgreSQL',
          'Distributed, fault-tolerant, self-healing storage',
          'Automated backups and point-in-time recovery',
          'Up to 15 low-latency read replicas'
        ]
      },
      {
        name: 'Amazon Redshift',
        description: 'Fast, simple, cost-effective data warehousing',
        features: [
          'Column-oriented storage optimized for analytics',
          'SQL interface for querying data',
          'Integration with data lakes',
          'Enterprise-grade security',
          'Scale to petabytes of data'
        ]
      },
      {
        name: 'Amazon ElastiCache',
        description: 'In-memory caching service',
        features: [
          'Support for Redis and Memcached',
          'Push-button scalability',
          'Data tiering for cost optimization',
          'Multi-AZ with automatic failover',
          'Encryption in transit and at rest'
        ]
      }
    ],
    backend: [
      {
        name: 'AWS Lambda',
        description: 'Run code without thinking about servers or clusters',
        features: [
          'Automatic scaling',
          'Pay only for what you use',
          'Support for multiple languages',
          'Integrated security model',
          'Event-driven execution'
        ]
      },
      {
        name: 'Amazon EC2',
        description: 'Resizable compute capacity in the cloud',
        features: [
          'Wide selection of instance types',
          'Pay only for what you use',
          'Integrated with most AWS services',
          'Multiple purchasing options',
          'GPU instances available'
        ]
      },
      {
        name: 'AWS Elastic Beanstalk',
        description: 'Platform as a service for web applications',
        features: [
          'Support for various programming languages',
          'Automatic scaling',
          'Load balancing',
          'Automated platform updates',
          'Application health monitoring'
        ]
      },
      {
        name: 'AWS App Runner',
        description: 'Fully managed service for containerized applications',
        features: [
          'From source code to global service',
          'Automatic scaling',
          'Traffic encryption',
          'Private connectivity',
          'Integration with other AWS services'
        ]
      }
    ],
    frontend: [
      {
        name: 'Amazon S3',
        description: 'Object storage built to store and retrieve any amount of data',
        features: [
          'Industry-leading scalability',
          'Data availability and durability',
          'Security and compliance capabilities',
          'Flexible management features',
          'Query-in-place functionality'
        ]
      },
      {
        name: 'Amazon CloudFront',
        description: 'Fast, highly secure and programmable content delivery network (CDN)',
        features: [
          'Global edge network',
          'Security at the edge',
          'Programmable with AWS Lambda@Edge',
          'Deep integration with AWS services',
          'Real-time metrics and logs'
        ]
      },
      {
        name: 'AWS Amplify',
        description: 'Complete solution for building full-stack applications',
        features: [
          'Git-based CI/CD workflow',
          'Global hosting with atomic deployments',
          'Instant cache invalidation',
          'Server-side rendering support',
          'Integrated authentication'
        ]
      },
      {
        name: 'Amazon API Gateway',
        description: 'Create, publish, maintain, monitor, and secure APIs at any scale',
        features: [
          'Multiple endpoint types',
          'Throttling and rate limiting',
          'API versioning',
          'WebSocket APIs support',
          'Request/response transformation'
        ]
      }
    ]
  },
  Azure: {
    databases: [
      {
        name: 'Azure SQL Database',
        description: 'Intelligent, scalable, cloud database service',
        features: [
          'Built-in machine learning',
          'Automatic tuning',
          'Geo-replication',
          'Advanced security features',
          'Elastic pools for multiple databases'
        ]
      },
      {
        name: 'Azure Cosmos DB',
        description: 'Globally distributed, multi-model database service',
        features: [
          'Multiple APIs (SQL, MongoDB, Cassandra, etc.)',
          'Global distribution and low latency',
          'Automatic and instant scalability',
          'Comprehensive SLAs',
          'Schema-agnostic indexing'
        ]
      },
      {
        name: 'Azure Database for MySQL',
        description: 'Fully managed MySQL database service',
        features: [
          'High availability architecture',
          'Predictable performance',
          'Scale as needed within seconds',
          'Advanced threat protection',
          'Automatic backups'
        ]
      },
      {
        name: 'Azure Database for PostgreSQL',
        description: 'Fully managed PostgreSQL database service',
        features: [
          'Built-in high availability',
          'Automatic patching and updates',
          'Predictable performance',
          'Elastic scaling',
          'Advanced security features'
        ]
      },
      {
        name: 'Azure Cache for Redis',
        description: 'Fully managed in-memory caching service',
        features: [
          'Secure and dedicated Redis server instances',
          'High availability with Redis clustering',
          'Enterprise features with Redis Enterprise',
          'Data persistence options',
          'Geo-replication capabilities'
        ]
      }
    ],
    backend: [
      {
        name: 'Azure Functions',
        description: 'Event-driven, serverless compute platform',
        features: [
          'Supports multiple languages',
          'Pay only for execution time',
          'Integrated security model',
          'Bindings for various services integration',
          'Durable functions for stateful workflows'
        ]
      },
      {
        name: 'Azure Virtual Machines',
        description: 'Windows or Linux VMs for complex cloud scenarios',
        features: [
          'Wide selection of VM types and sizes',
          'Support for specialized hardware',
          'Hybrid connectivity options',
          'Pay-per-second billing',
          'Comprehensive SLAs'
        ]
      },
      {
        name: 'Azure App Service',
        description: 'Build, deploy, and scale web apps on a fully managed platform',
        features: [
          'Support for multiple languages and frameworks',
          'Built-in auto scaling and load balancing',
          'CI/CD integration with GitHub, BitBucket, Azure DevOps',
          'Application insights for monitoring',
          'Slot-based deployment for zero-downtime updates'
        ]
      },
      {
        name: 'Azure Container Instances',
        description: 'Run containers without managing servers',
        features: [
          'Fast startup times',
          'Per-second billing',
          'Custom sizes for precise resource allocation',
          'Persistent storage options',
          'Virtual network deployment'
        ]
      },
      {
        name: 'Azure Kubernetes Service',
        description: 'Fully managed Kubernetes container orchestration',
        features: [
          'Automated Kubernetes deployments',
          'Simplified cluster management',
          'Integrated CI/CD and monitoring',
          'Virtual network integration',
          'Integration with Azure Active Directory'
        ]
      }
    ],
    frontend: [
      {
        name: 'Azure Storage',
        description: 'Massively scalable object storage for unstructured data',
        features: [
          'Blob, File, Queue, and Table storage',
          'Data redundancy options',
          'Data lifecycle management',
          'Security features including encryption',
          'Scalability and high performance'
        ]
      },
      {
        name: 'Azure Content Delivery Network',
        description: 'Global content delivery network with dynamic site acceleration',
        features: [
          'Global point-of-presence coverage',
          'Dynamic site acceleration',
          'HTTPS custom domain support',
          'Real-time analytics',
          'Advanced security features'
        ]
      },
      {
        name: 'Azure Static Web Apps',
        description: 'Automatically build and deploy full-stack web apps',
        features: [
          'Built-in CI/CD',
          'Globally distributed content',
          'Free SSL certificates',
          'Custom domain support',
          'Authentication and authorization'
        ]
      },
      {
        name: 'Azure API Management',
        description: 'Publish, secure, transform, maintain, and monitor APIs',
        features: [
          'API gateway',
          'Developer portal',
          'Policy-based control',
          'Analytics and monitoring',
          'OpenAPI support'
        ]
      }
    ]
  },
  GCP: {
    databases: [
      {
        name: 'Cloud SQL',
        description: 'Fully managed relational database service',
        features: [
          'Support for MySQL, PostgreSQL, and SQL Server',
          'Automated backups and maintenance',
          'High availability configuration',
          'Scaling options for storage and memory',
          'Data encryption and security controls'
        ]
      },
      {
        name: 'Cloud Firestore',
        description: 'Flexible, scalable NoSQL cloud database',
        features: [
          'Real-time data synchronization',
          'Strong consistency guarantees',
          'Multi-region replication',
          'Automatic scaling and high availability',
          'Powerful query capabilities'
        ]
      },
      {
        name: 'Cloud Bigtable',
        description: 'Fully managed, scalable NoSQL database service',
        features: [
          'Consistent sub-10ms latency',
          'Seamless scaling to billions of rows and thousands of columns',
          'Easy integration with open-source big data tools',
          'Industry-standard HBase API',
          'Replication for high availability'
        ]
      },
      {
        name: 'Cloud Spanner',
        description: 'Globally distributed, horizontally scalable, and strongly consistent database service',
        features: [
          'SQL-based relational database structure',
          'Automatic sharding for horizontal scaling',
          'Synchronous replication for high availability',
          'Strong global consistency',
          'Enterprise-grade security'
        ]
      },
      {
        name: 'Memorystore',
        description: 'Fully managed in-memory data store service',
        features: [
          'Redis and Memcached compatibility',
          'High availability configuration',
          'Automatic scaling',
          'Data persistence',
          'Fully managed operations'
        ]
      }
    ],
    backend: [
      {
        name: 'Cloud Functions',
        description: 'Event-driven serverless compute platform',
        features: [
          'Automatic scaling',
          'Pay only for execution time',
          'Integrated security model',
          'Event-based triggers',
          'Zero server management'
        ]
      },
      {
        name: 'Compute Engine',
        description: 'Virtual machines running in Google\'s data centers',
        features: [
          'Custom machine types',
          'Persistent disks and local SSDs',
          'Per-second billing',
          'Sustained use discounts',
          'Committed use discounts'
        ]
      },
      {
        name: 'App Engine',
        description: 'Fully managed, serverless platform for building and hosting applications',
        features: [
          'Support for popular languages and frameworks',
          'Built-in services and APIs',
          'Automatic scaling',
          'Versioning support',
          'Traffic splitting for A/B testing'
        ]
      },
      {
        name: 'Cloud Run',
        description: 'Fully managed compute platform for containerized applications',
        features: [
          'Automatic scaling to zero',
          'Pay-per-use pricing',
          'Built on open standards',
          'Container-based workflow',
          'Integrated with GCP\'s security controls'
        ]
      },
      {
        name: 'Google Kubernetes Engine',
        description: 'Managed Kubernetes service for containerized applications',
        features: [
          'Auto-scaling and auto-upgrading',
          'Multi-cluster support',
          'Integrated logging and monitoring',
          'Security and compliance controls',
          'Hybrid networking capabilities'
        ]
      }
    ],
    frontend: [
      {
        name: 'Cloud Storage',
        description: 'Object storage that\'s secure, durable, and scalable',
        features: [
          'Multiple storage classes',
          'Global edge network',
          'Object lifecycle management',
          'Strong consistency',
          'Data encryption and security features'
        ]
      },
      {
        name: 'Cloud CDN',
        description: 'Content delivery network for serving web and video content',
        features: [
          'Global reach',
          'High performance',
          'Simplified configuration',
          'Analytics and monitoring',
          'Security features'
        ]
      },
      {
        name: 'Firebase Hosting',
        description: 'Fast and secure hosting for web applications',
        features: [
          'Global CDN',
          'Automatic SSL certificate provisioning',
          'Atomic releases with easy rollbacks',
          'One-click deployment',
          'Integration with Firebase services'
        ]
      },
      {
        name: 'API Gateway',
        description: 'Fully managed API management service',
        features: [
          'API security and monitoring',
          'API versioning',
          'Developer portal',
          'Publishing options',
          'Backend service authentication'
        ]
      }
    ]
  }
};

export default cloudServices;