import 'dart:io';

class AppExceptionCode implements Exception {
  final String code;
  const AppExceptionCode({required this.code});
}

enum CrashlyticsErrorStatusEnum { fatal, nonFatal, dontReport }

extension CrashlyticsErrorStatusEnumExtension on CrashlyticsErrorStatusEnum {
  bool get isFatal => this == CrashlyticsErrorStatusEnum.fatal;
  bool get shouldNotReport => this == CrashlyticsErrorStatusEnum.dontReport;
}

class ErrorHandler {
  static void reportError(FlutterErrorDetails flutterErrorDetails) {
    ...
  }

  static void handleDioException(DioException error) {
    switch (error.type) {
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.connectionTimeout:
        handleAppExceptionCode(code: kDioTimeoutErrorKey);
        break;
      case DioExceptionType.unknown:
        handleAppExceptionCode(code: kDioUnknownErrorKey);
        break;
      ...
    }
  }

  static void handleAppExceptionCode({required String code}) {
    if (code.startsWith(kBracketsContentRegex)) {
      final errorMsg = code.replaceAll(kBracketsContentRegex, '');
      // Handle errorMsg here, e.g., report it to your error reporting tool or display a message.
    } else {
      handleAppExceptionCode(code: kGenericErrorKey);
    }
  }
}

final kDioTimeoutErrorKey = 'DIO_TIMEOUT';
final kDioUnknownErrorKey = 'DIO_UNKNOWN';
final kBracketsContentRegex = RegExp('\\[.*\\]');

final kGenericErrorKey = 'GENERIC_FAIL_MESSAGE';
final kDioTimeoutErrorMsg = 'The request took too much time. Please try again later';
final kDioUnknownErrorMsg = 'Check your internet connection and try again';
final kGenericErrorMsg = 'Oh no! Something went really wrong.';
