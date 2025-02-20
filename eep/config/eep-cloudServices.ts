import { CloudServiceConfig } from "@/types/eep-dashboard";


export const cloudServices: CloudServiceConfig = {
  AWS: {
    databases: [
      {
        name: 'Amazon RDS',
        description: 'Managed Relational Database Service',
        features: [
          'Automated patching and backups',
          'Multi-AZ deployment',
          'Read replicas for improved performance',
          'Six database engines to choose from'
        ]
      },
      {
        name: 'Amazon DynamoDB',
        description: 'Fully managed NoSQL database',
        features: [
          'Single-digit millisecond performance',
          'Built-in security and encryption',
          'Automatic scaling',
          'Global tables for multi-region deployment'
        ]
      },
      {
        name: 'Amazon Aurora',
        description: 'MySQL and PostgreSQL-compatible database',
        features: [
          '5x performance of MySQL',
          'Distributed storage with auto-scaling',
          'Continuous backup to S3',
          'Serverless option available'
        ]
      }
    ],
    backend: [
      {
        name: 'AWS Lambda',
        description: 'Serverless compute service',
        features: [
          'Pay-per-use pricing',
          'Automatic scaling',
          'Supports multiple programming languages',
          'Integrated security model'
        ]
      },
      {
        name: 'Amazon SageMaker',
        description: 'Machine Learning platform',
        features: [
          'Built-in algorithms',
          'Automated model tuning',
          'Integrated development environment',
          'One-click deployment'
        ]
      },
      {
        name: 'AWS IoT Greengrass',
        description: 'Edge computing service',
        features: [
          'Local compute capabilities',
          'Machine learning at edge',
          'Device security management',
          'Local messaging'
        ]
      }
    ],
    frontend: [
      {
        name: 'AWS CodeCatalyst',
        description: 'Unified software development service',
        features: [
          'Automated CI/CD pipelines',
          'Development environments',
          'Issue tracking',
          'Team collaboration tools'
        ]
      },
      {
        name: 'API Gateway + Lambda',
        description: 'Serverless API solution',
        features: [
          'RESTful and WebSocket APIs',
          'Request/response transformation',
          'API versioning',
          'Usage plans and API keys'
        ]
      },
      {
        name: 'AWS Amplify',
        description: 'Full-stack development platform',
        features: [
          'Authentication and authorization',
          'GraphQL API support',
          'Continuous deployment',
          'Hosting and content delivery'
        ]
      }
    ]
  },
  Azure: {
    databases: [
      {
        name: 'Azure SQL Database',
        description: 'Managed SQL Server database',
        features: [
          'Built-in intelligence',
          'Automatic tuning',
          'Advanced security',
          'Scalable performance'
        ]
      }
    ],
    backend: [
      {
        name: 'Azure Functions',
        description: 'Event-driven serverless compute',
        features: [
          'Serverless architecture',
          'Multiple language support',
          'Integrated security',
          'Pay-per-execution pricing'
        ]
      }
    ],
    frontend: [
      {
        name: 'Azure Static Web Apps',
        description: 'Modern web app service',
        features: [
          'Built-in CI/CD',
          'Serverless API support',
          'Global distribution',
          'Free SSL certificates'
        ]
      }
    ]
  },
  GCP: {
    databases: [
      {
        name: 'Cloud SQL',
        description: 'Managed MySQL, PostgreSQL, and SQL Server',
        features: [
          'Automated backups',
          'High availability configuration',
          'Integrated security',
          'Automatic storage increases'
        ]
      }
    ],
    backend: [
      {
        name: 'Cloud Functions',
        description: 'Event-driven serverless platform',
        features: [
          'Automatic scaling',
          'Pay-only-for-use',
          'Connected to Google Cloud events',
          'Multiple runtime environments'
        ]
      }
    ],
    frontend: [
      {
        name: 'App Engine',
        description: 'Fully managed platform',
        features: [
          'Built-in auto scaling',
          'Load balancing',
          'Version management',
          'Traffic splitting'
        ]
      }
    ]
  }
};