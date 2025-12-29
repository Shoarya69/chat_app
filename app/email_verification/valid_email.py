from email_validator import validate_email, EmailNotValidError

def is_valid_email(email: str) -> str:
    try:
        valid = validate_email(email)
        return valid.email   # normalized email
    except EmailNotValidError:
        return None
