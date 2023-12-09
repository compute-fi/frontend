"use client";
import * as React from 'react';
import ComputeForm from './compute';
import StatusForm from './status';
import LogForm from './log';

const TestForm = () => {
    return (
        <>
        <ComputeForm/>
        <StatusForm/>
        <LogForm/>
        </>
    )
}

export default TestForm;