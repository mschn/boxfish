import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export function validateId(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  _: FastifyReply,
  done: HookHandlerDoneFunction
) {
  const { id } = request.params;
  done(
    id == null || id.length === 0
      ? new Error("id request parameter is mandatory")
      : undefined
  );
}
