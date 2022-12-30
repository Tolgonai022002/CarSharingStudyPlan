import { Module , forwardRef} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(()=>UserModule),
    JwtModule.register({
      secret:process.env.JWT_SECRET || 'secret',
      signOptions:{
        expiresIn:'24h'
      }
    })
  ] ,
  exports:[AuthService,JwtModule],
  controllers:[AuthController],
  providers:[AuthService]
})
export class AuthModule {}
