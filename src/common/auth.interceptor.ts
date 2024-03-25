import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service'
import { responseData } from './utils/response_data';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly tokenService: TokenService
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data) => {
        const request = context.switchToHttp().getRequest();
        const token = request.query.token || request.body.token
        const userInfo = await this.tokenService.checkToken(token)

        // 白名单
        if(this.includesBlankUrl(request.path)) {
          return data
        }
        if(!userInfo) {
          return responseData('MT1000', '登录超时，请重新登录')
        }
        return data
      }),
    );
  }

  private blankUrlList: Array<string> = [
    '/answer-manager-api/user/login'
  ]

  private includesBlankUrl(url: string): boolean {
    return this.blankUrlList.includes(url)
  }
}
