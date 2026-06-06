package com.acadex.students.domain;

/**
 * Student Lifecycle Status — every transition is auditable.
 * 
 * Flow: PROSPECT → APPLICANT → VERIFIED_APPLICANT → ADMITTED → ENROLLED → 
 *       ACTIVE → PROMOTED → GRADUATED → ALUMNI
 * 
 * Side transitions: TRANSFERRED, WITHDRAWN, SUSPENDED
 */
public enum StudentLifecycleStatus {
    PROSPECT,
    APPLICANT,
    VERIFIED_APPLICANT,
    ADMITTED,
    ENROLLED,
    ACTIVE,
    PROMOTED,
    TRANSFERRED,
    WITHDRAWN,
    SUSPENDED,
    GRADUATED,
    ALUMNI
}
