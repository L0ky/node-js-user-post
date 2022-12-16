import User from './user/user.model';

test('can register a user ') => {
    const user = new User({
        email: 'john.doe@gmail.com',
        password : '123456'    
    })

    expect(user.email).toBe('john.doe@gmail.com');
}