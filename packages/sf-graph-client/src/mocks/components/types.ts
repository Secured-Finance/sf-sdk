import { DocumentNode } from '@apollo/client';

export interface MockComponentProps {
    query: DocumentNode;
    variables: any;
}
