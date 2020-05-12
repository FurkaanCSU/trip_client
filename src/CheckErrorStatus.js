import React from "react";

import { HTTP_OK } from "./Constants";
import {Container} from "reactstrap";
import ErrorBanner from "./ErrorBanner";

export function checkErrorResponse(errorResponse) {
        if (errorResponse.statusCode === HTTP_OK) {
            return false;
        }
        return true
}

export function createErrorBanner(response, message = "Something went wrong.") {
    return (
        <Container>
            <ErrorBanner statusText={response.statusText}
                         statusCode={response.statusCode}
                         message={message}
            />
        </Container>
    );
}