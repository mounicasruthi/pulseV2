package user

type service struct {
	Repository
	timeout time.Duration
}

func NewService(repository Repository) Service {
	return &service{repository, time.Duration(2)*time.Second}
}

//this will be called by the handler layer
func (s *service) CreateUser(c context.Context, req *CreateUserReq) (*CreateUserRes, error) {

	ctx, cancel := context.withTimeout(c, s.timeout)
	defer cancel()

	hashedPassword, err := util.HashPassword(req.Password)

	if err != nil {
		return nil, err
	}

	u := &User{
		Username: req.Username,
		Email: req.Email,
		Password: hashedPassword,
	}

	s.Repository.CreateUser(ctx, u)

	if err != nil {
		return nil, err
	}

	res := &CreateUserRes{
		ID: strconv.Itoa(int(r.ID)),
		Username: r.Username,
		Email: r.Email,
	}

	return res, nil
}