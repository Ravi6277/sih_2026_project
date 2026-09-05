from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import (
    TokenRefreshRequest,
    TokenResponse,
    UserLoginRequest,
    UserRegisterRequest,
    UserResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user account",
)
def register_user(
    payload: UserRegisterRequest,
    db: Session = Depends(get_db),
):
    """Create a new user account with hashed password and initial role."""
    service = AuthService(db)
    return service.register(payload)


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="User Login & JWT Generation",
)
def login_user(
    payload: UserLoginRequest,
    db: Session = Depends(get_db),
):
    """Authenticate email & password, returning access and refresh JWTs."""
    service = AuthService(db)
    return service.login(payload)


@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Refresh Expired Access Token",
)
def refresh_access_token(
    payload: TokenRefreshRequest,
    db: Session = Depends(get_db),
):
    """Exchange a valid refresh token for a newly signed access token."""
    service = AuthService(db)
    return service.refresh(payload)


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get Current Authenticated User Profile",
)
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
):
    """Return the profile information of the currently authenticated principal."""
    return UserResponse.model_validate(current_user)
